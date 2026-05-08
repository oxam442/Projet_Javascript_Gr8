// Variables globales
let pageTimer = 0;
let timerInterval;

// Gestion de la copie - message de plagiat
document.addEventListener('copy', function(e) {
    console.warn('⚠️ RAPPEL SUR LE PLAGIAT ⚠️');
    console.warn('Le plagiat est strictement interdit et constitue une violation de la propriété intellectuelle.');
    console.warn('Tout contenu copié doit être correctement cité et utilisé de manière éthique.');
    console.warn('CowalkZilla © 2026 - Tous droits réservés');
});

// Gestion des erreurs
window.addEventListener('error', function(e) {
    console.error('❌ ERREUR DÉTECTÉE:', e.message);
    console.error('Fichier:', e.filename);
    console.error('Ligne:', e.lineno);
});

// Horloge en temps réel
function updateClock() {
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// Chronomètre de page
function updateTimer() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        pageTimer++;
        const minutes = Math.floor(pageTimer / 60);
        const seconds = pageTimer % 60;
        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

// Initialisation de l'horloge et du chronomètre
function initTimeDisplays() {
    updateClock();
    setInterval(updateClock, 1000);
    
    pageTimer = 0;
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    timerInterval = setInterval(updateTimer, 1000);
}

// Gestion de la navigation avec délai
function setupNavigationDelay() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('href');
            const pageName = this.getAttribute('data-page');
            
            // Cas spécial pour la page équipe
            if (pageName === 'team') {
                const confirmNavigation = confirm('Êtes-vous sûr de vouloir accéder à la présentation de l\'équipe ?');
                if (!confirmNavigation) {
                    return;
                }
            }
            
            // Changement de couleur du menu
            const oldColor = window.getComputedStyle(this).backgroundColor;
            this.style.backgroundColor = 'var(--primary-color)';
            this.style.color = 'white';
            const newColor = window.getComputedStyle(this).backgroundColor;
            
            console.log(`Navigation: Changement de couleur du menu`);
            console.log(`Ancienne couleur: ${oldColor}`);
            console.log(`Nouvelle couleur: ${newColor}`);
            
            // Afficher le loader
            const loadingOverlay = document.getElementById('loadingOverlay');
            if (loadingOverlay) {
                loadingOverlay.classList.add('active');
            }
            
            // Redirection après 2 secondes
            setTimeout(() => {
                window.location.href = targetPage;
            }, 2000);
        });
    });
}

// Retour à l'accueil par le logo
function setupLogoClick() {
    const logo = document.getElementById('logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            
            const loadingOverlay = document.getElementById('loadingOverlay');
            if (loadingOverlay) {
                loadingOverlay.classList.add('active');
            }
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }
}

// Gestion du téléphone dans le footer
function setupPhoneCopy() {
    const phoneElements = document.querySelectorAll('.copyable-phone');
    
    phoneElements.forEach(phone => {
        phone.addEventListener('copy', function(e) {
            e.preventDefault();
            
            const phoneNumber = this.textContent.trim();
            
            // Copier dans le presse-papier
            navigator.clipboard.writeText(phoneNumber).then(() => {
                // Prompt pour confirmation
                const userInput = prompt(`Si vous voulez appeler ce numéro : ${phoneNumber}, entrez-le de nouveau dans le champ ci-dessous puis validez`);
                
                if (userInput === phoneNumber) {
                    console.log(`📞 Vous appelez ce numéro : ${phoneNumber}`);
                    
                    // Jouer une sonnerie
                    playRingtone();
                } else if (userInput !== null) {
                    console.error('❌ ERREUR: Le numéro saisi ne correspond pas.');
                }
            });
        });
    });
}

// Fonction pour jouer une sonnerie
function playRingtone() {
    // Créer un contexte audio
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const duration = 5; // 5 secondes
    
    // Créer des oscillateurs pour simuler une sonnerie
    function playTone(frequency, startTime, noteLength) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + noteLength);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + noteLength);
    }
    
    // Créer un pattern de sonnerie
    const now = audioContext.currentTime;
    const noteLength = 0.3;
    const pauseLength = 0.2;
    
    for (let i = 0; i < 5; i++) {
        const startTime = now + i * (noteLength * 2 + pauseLength);
        playTone(800, startTime, noteLength);
        playTone(600, startTime + noteLength, noteLength);
    }
}

// Validation des formulaires génériques
function validateForm(formId, validations) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this, validations[this.name]);
        });
        
        input.addEventListener('blur', function() {
            validateField(this, validations[this.name]);
        });
    });
}

function validateField(field, validation) {
    const errorElement = field.parentElement.querySelector('.error-message');
    
    if (!validation) return true;
    
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    if (validation.required && !value) {
        isValid = false;
        errorMessage = 'Ce champ est requis';
    } else if (validation.minLength && value.length < validation.minLength) {
        isValid = false;
        errorMessage = `Minimum ${validation.minLength} caractères requis`;
    } else if (validation.maxLength && value.length > validation.maxLength) {
        isValid = false;
        errorMessage = `Maximum ${validation.maxLength} caractères autorisés`;
    } else if (validation.pattern && !validation.pattern.test(value)) {
        isValid = false;
        errorMessage = validation.message || 'Format invalide';
    } else if (validation.custom && !validation.custom(value)) {
        isValid = false;
        errorMessage = validation.message || 'Valeur invalide';
    }
    
    if (errorElement) {
        if (!isValid) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            field.style.borderColor = '#ff4444';
            console.error(`❌ ERREUR DE VALIDATION: ${field.name} - ${errorMessage}`);
        } else {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            field.style.borderColor = '#4CAF50';
        }
    }
    
    return isValid;
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initTimeDisplays();
    setupNavigationDelay();
    setupLogoClick();
    setupPhoneCopy();
    
    // Marquer le lien actif
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Nettoyage à la fermeture
window.addEventListener('beforeunload', function() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
});
