// Variables globales
let formData = {};

// Règles de validation
const validationRules = {
    fullName: {
        required: true,
        custom: function(value) {
            const words = value.trim().split(/\s+/);
            return words.length === 2;
        },
        message: 'Le nom doit contenir exactement 2 mots séparés par un espace (Prénom Nom)'
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'L\'email doit contenir un @ et un point'
    },
    message: {
        required: true,
        minLength: 20,
        maxLength: 1000,
        message: 'Le message doit contenir entre 20 et 1000 caractères'
    }
};

// Fonction de validation d'un champ
function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    const rules = validationRules[fieldName];
    const errorElement = field.parentElement.querySelector('.error-message');
    
    let isValid = true;
    let errorMessage = '';
    
    if (rules.required && !value) {
        isValid = false;
        errorMessage = 'Ce champ est requis';
    } else if (rules.minLength && value.length < rules.minLength) {
        isValid = false;
        errorMessage = `Minimum ${rules.minLength} caractères requis`;
    } else if (rules.maxLength && value.length > rules.maxLength) {
        isValid = false;
        errorMessage = `Maximum ${rules.maxLength} caractères autorisés`;
    } else if (rules.pattern && !rules.pattern.test(value)) {
        isValid = false;
        errorMessage = rules.message;
    } else if (rules.custom && !rules.custom(value)) {
        isValid = false;
        errorMessage = rules.message;
    }
    
    // Afficher ou masquer l'erreur
    if (errorElement) {
        if (!isValid && value.length > 0) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('active');
            field.classList.add('invalid');
            field.classList.remove('valid');
            console.error(`❌ ERREUR DE VALIDATION: ${fieldName} - ${errorMessage}`);
        } else if (isValid && value.length > 0) {
            errorElement.textContent = '';
            errorElement.classList.remove('active');
            field.classList.remove('invalid');
            field.classList.add('valid');
        } else {
            errorElement.textContent = '';
            errorElement.classList.remove('active');
            field.classList.remove('invalid', 'valid');
        }
    }
    
    return isValid;
}

// Fonction pour vérifier si le formulaire est valide
function checkFormValidity() {
    const fullNameField = document.getElementById('fullName');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    
    const isFullNameValid = validateField(fullNameField);
    const isEmailValid = validateField(emailField);
    const isMessageValid = validateField(messageField);
    
    const isFormValid = isFullNameValid && isEmailValid && isMessageValid &&
                       fullNameField.value.trim() !== '' &&
                       emailField.value.trim() !== '' &&
                       messageField.value.trim() !== '';
    
    submitBtn.disabled = !isFormValid;
}

// Compteur de caractères pour le message
function setupCharacterCounter() {
    const messageField = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    messageField.addEventListener('input', function() {
        const currentLength = this.value.length;
        charCount.textContent = `${currentLength} / 1000`;
        
        if (currentLength > 1000) {
            charCount.style.color = '#ff4444';
        } else if (currentLength >= 20) {
            charCount.style.color = '#4CAF50';
        } else {
            charCount.style.color = '#666';
        }
    });
}

// Configuration des événements de validation
function setupValidation() {
    const fields = document.querySelectorAll('#contactForm input, #contactForm textarea');
    
    fields.forEach(field => {
        // Validation en temps réel
        field.addEventListener('input', function() {
            validateField(this);
            checkFormValidity();
        });
        
        // Validation au blur
        field.addEventListener('blur', function() {
            validateField(this);
            checkFormValidity();
        });
    });
}

// Soumission du formulaire
function setupFormSubmit() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Sauvegarder les données du formulaire
        formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        console.log('📝 Formulaire soumis:', formData);
        
        // Cacher le formulaire et afficher le jeu
        document.querySelector('.contact-form-section').style.display = 'none';
        document.getElementById('gameSection').style.display = 'block';
        
        // Scroll vers le jeu
        document.getElementById('gameSection').scrollIntoView({ behavior: 'smooth' });
    });
}

// Jeu Pierre-Feuille-Ciseaux
const choices = ['pierre', 'feuille', 'ciseaux'];
const choiceIcons = {
    'pierre': '✊',
    'feuille': '✋',
    'ciseaux': '✌️'
};

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    }
    
    if (
        (playerChoice === 'pierre' && computerChoice === 'ciseaux') ||
        (playerChoice === 'feuille' && computerChoice === 'pierre') ||
        (playerChoice === 'ciseaux' && computerChoice === 'feuille')
    ) {
        return 'win';
    }
    
    return 'lose';
}

function showGameResult(playerChoice, computerChoice, result) {
    const gameResult = document.getElementById('gameResult');
    const playerChoiceDisplay = document.getElementById('playerChoiceDisplay');
    const computerChoiceDisplay = document.getElementById('computerChoiceDisplay');
    const resultMessage = document.getElementById('resultMessage');
    
    // Afficher les choix
    playerChoiceDisplay.textContent = choiceIcons[playerChoice];
    computerChoiceDisplay.textContent = choiceIcons[computerChoice];
    
    // Afficher le résultat
    let messageText = '';
    let messageClass = '';
    
    if (result === 'win') {
        messageText = '🎉 Vous avez gagné ! Votre message a été envoyé avec succès !';
        messageClass = 'win';
    } else if (result === 'lose') {
        messageText = '😢 Vous avez perdu... Le formulaire va être réinitialisé.';
        messageClass = 'lose';
    } else {
        messageText = '🤝 Égalité ! Rejouez pour tenter votre chance.';
        messageClass = 'draw';
    }
    
    resultMessage.textContent = messageText;
    resultMessage.className = `result-message ${messageClass}`;
    
    gameResult.style.display = 'block';
    
    console.log(`🎮 Jeu: Vous: ${playerChoice}, Ordinateur: ${computerChoice}, Résultat: ${result}`);
    
    // Gérer le résultat après 3 secondes
    setTimeout(() => {
        if (result === 'win') {
            handleWin();
        } else if (result === 'lose') {
            handleLoss();
        } else {
            // En cas d'égalité, on peut rejouer
            gameResult.style.display = 'none';
        }
    }, 3000);
}

function handleWin() {
    // Afficher un message de succès
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        ✅ Message envoyé avec succès !<br>
        <span style="font-size: 1rem; font-weight: normal;">Nous vous répondrons dans les plus brefs délais.</span>
    `;
    document.body.appendChild(successMessage);
    
    console.log('✅ MESSAGE ENVOYÉ:', formData);
    
    // Retour à la page de contact après 4 secondes
    setTimeout(() => {
        successMessage.remove();
        resetContactPage();
    }, 4000);
}

function handleLoss() {
    console.log('❌ Défaite - Réinitialisation du formulaire');
    
    // Retour à la page de contact et réinitialisation
    resetContactPage();
}

function resetContactPage() {
    // Réinitialiser le formulaire
    document.getElementById('contactForm').reset();
    
    // Enlever les classes de validation
    const fields = document.querySelectorAll('#contactForm input, #contactForm textarea');
    fields.forEach(field => {
        field.classList.remove('valid', 'invalid');
    });
    
    // Réinitialiser le compteur de caractères
    document.getElementById('charCount').textContent = '0 / 1000';
    document.getElementById('charCount').style.color = '#666';
    
    // Désactiver le bouton submit
    document.getElementById('submitBtn').disabled = true;
    
    // Cacher le jeu et afficher le formulaire
    document.getElementById('gameSection').style.display = 'none';
    document.querySelector('.contact-form-section').style.display = 'block';
    
    // Réinitialiser l'affichage du résultat du jeu
    document.getElementById('gameResult').style.display = 'none';
    
    // Scroll vers le formulaire
    document.querySelector('.contact-form-section').scrollIntoView({ behavior: 'smooth' });
    
    // Réinitialiser les données
    formData = {};
}

function setupGame() {
    const choiceButtons = document.querySelectorAll('.choice-btn');
    
    choiceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const playerChoice = this.getAttribute('data-choice');
            const computerChoice = getComputerChoice();
            const result = determineWinner(playerChoice, computerChoice);
            
            showGameResult(playerChoice, computerChoice, result);
        });
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    setupValidation();
    setupCharacterCounter();
    setupFormSubmit();
    setupGame();
});
