// Données des membres de l'équipe
let teamMembers = [
    {
        id: 1,
        name: "Sophie Martin",
        role: "CEO & Co-fondatrice",
        email: "sophie.martin@cowalkzilla.com",
        bio: "Visionnaire passionnée par l'innovation et la collaboration. Sophie a 10 ans d'expérience dans la tech et dirige CowalkZilla vers de nouveaux sommets.",
        photo: "images/team1.jpg",
        skills: ["Leadership", "Stratégie", "Innovation"],
        isOriginal: true
    },
    {
        id: 2,
        name: "Thomas Dubois",
        role: "CTO & Co-fondateur",
        email: "thomas.dubois@cowalkzilla.com",
        bio: "Expert en architecture logicielle avec une passion pour les technologies émergentes. Thomas garantit l'excellence technique de nos produits.",
        photo: "images/team2.jpg",
        skills: ["Architecture", "DevOps", "AI/ML"],
        isOriginal: true
    },
    {
        id: 3,
        name: "Marie Laurent",
        role: "Lead Designer UX/UI",
        email: "marie.laurent@cowalkzilla.com",
        bio: "Créative talentueuse qui transforme les idées complexes en expériences utilisateur intuitives et élégantes.",
        photo: "images/team3.jpg",
        skills: ["Design UX", "Prototypage", "User Research"],
        isOriginal: true
    },
    {
        id: 4,
        name: "Alexandre Chen",
        role: "Head of Product",
        email: "alexandre.chen@cowalkzilla.com",
        bio: "Passionné par la création de produits qui résolvent de vrais problèmes. Alexandre coordonne notre roadmap produit.",
        photo: "images/team4.jpg",
        skills: ["Product Management", "Agile", "Analytics"],
        isOriginal: true
    }
];

let isEditMode = false;
let nextMemberId = 5;

// Fonction pour créer une carte de membre
function createTeamCard(member) {
    const card = document.createElement('div');
    card.className = 'team-card';
    if (!member.isOriginal) {
        card.classList.add('new-member');
    }
    card.setAttribute('data-member-id', member.id);
    
    const skillsHTML = member.skills.map(skill => 
        `<span class="skill-tag">${skill}</span>`
    ).join('');
    
    const newBadge = !member.isOriginal ? '<span class="new-badge">NOUVEAU</span>' : '';
    
    card.innerHTML = `
        ${newBadge}
        <div class="member-photo-wrapper">
            <img src="${member.photo}" alt="${member.name}" class="member-photo"
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Crect width=%22300%22 height=%22300%22 fill=%22%23e0e0e0%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-size=%2230%22%3E👤%3C/text%3E%3C/svg%3E'">
        </div>
        <div class="member-info">
            <div class="member-name-wrapper">
                <h3 class="member-name" data-member-id="${member.id}">${member.name}</h3>
                <button class="btn-delete-member" data-member-id="${member.id}" title="Supprimer">🗑️</button>
            </div>
            <div class="member-role">${member.role}</div>
            <div class="member-email">${member.email}</div>
            <p class="member-bio">${member.bio}</p>
            <div class="member-skills">
                ${skillsHTML}
            </div>
        </div>
    `;
    
    return card;
}

// Fonction pour afficher l'équipe
function displayTeam() {
    const teamGrid = document.getElementById('teamGrid');
    teamGrid.innerHTML = '';
    
    teamMembers.forEach(member => {
        const card = createTeamCard(member);
        teamGrid.appendChild(card);
    });
    
    // Ajouter l'effet de grattage après le rendu
    setTimeout(() => {
        initializeScratchEffect();
    }, 100);
}

// Effet de grattage sur les photos
function initializeScratchEffect() {
    const photoWrappers = document.querySelectorAll('.member-photo-wrapper');
    
    photoWrappers.forEach(wrapper => {
        // Vérifier si le canvas n'existe pas déjà
        if (wrapper.querySelector('.scratch-canvas')) {
            return;
        }
        
        const canvas = document.createElement('canvas');
        canvas.className = 'scratch-canvas';
        wrapper.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const rect = wrapper.getBoundingClientRect();
        
        canvas.width = wrapper.offsetWidth;
        canvas.height = wrapper.offsetHeight;
        
        // Dessiner la couche opaque
        ctx.fillStyle = 'rgba(100, 100, 100, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        let isDrawing = false;
        
        function scratch(e) {
            if (!isDrawing) return;
            
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX || e.touches[0].clientX) - rect.left;
            const y = (e.clientY || e.touches[0].clientY) - rect.top;
            
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Événements souris
        canvas.addEventListener('mousedown', () => isDrawing = true);
        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mousemove', scratch);
        canvas.addEventListener('mouseleave', () => isDrawing = false);
        
        // Événements tactiles
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            isDrawing = true;
        });
        canvas.addEventListener('touchend', () => isDrawing = false);
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            scratch(e);
        });
    });
}

// Mode édition
function toggleEditMode() {
    isEditMode = !isEditMode;
    const editBtn = document.getElementById('editModeBtn');
    const addMemberContainer = document.getElementById('addMemberContainer');
    const deleteButtons = document.querySelectorAll('.btn-delete-member');
    const memberNames = document.querySelectorAll('.member-name');
    
    if (isEditMode) {
        editBtn.classList.add('active');
        editBtn.innerHTML = '<span class="edit-icon">💾</span>Quitter Édition';
        addMemberContainer.style.display = 'block';
        
        // Afficher les boutons de suppression (sauf pour les membres originaux)
        deleteButtons.forEach(btn => {
            const memberId = parseInt(btn.getAttribute('data-member-id'));
            const member = teamMembers.find(m => m.id === memberId);
            if (member && !member.isOriginal) {
                btn.classList.add('visible');
            }
        });
        
        // Rendre les noms éditables
        memberNames.forEach(name => {
            name.classList.add('editable');
        });
        
        console.log('✏️ Mode édition activé');
    } else {
        // Confirmer avant de quitter
        const confirmExit = confirm('Êtes-vous sûr de vouloir quitter le mode édition ?');
        if (!confirmExit) {
            isEditMode = true; // Rester en mode édition
            return;
        }
        
        editBtn.classList.remove('active');
        editBtn.innerHTML = '<span class="edit-icon">✏️</span>Mode Édition';
        addMemberContainer.style.display = 'none';
        
        // Cacher les boutons de suppression
        deleteButtons.forEach(btn => {
            btn.classList.remove('visible');
        });
        
        // Retirer l'édition des noms
        memberNames.forEach(name => {
            name.classList.remove('editable');
        });
        
        console.log('💾 Mode édition désactivé');
    }
}

// Authentification pour le mode édition
function authenticateEditMode() {
    const username = prompt('Entrez le nom du profil administrateur :');
    
    if (username !== 'admin') {
        if (username !== null) {
            console.error('❌ ERREUR: Nom d\'utilisateur incorrect');
            alert('Nom d\'utilisateur incorrect');
        }
        return false;
    }
    
    const password = prompt('Entrez le mot de passe du profil administrateur :');
    
    if (password !== 'admin_pwd') {
        if (password !== null) {
            console.error('❌ ERREUR: Mot de passe incorrect');
            alert('Mot de passe incorrect');
        }
        return false;
    }
    
    console.log('✅ Authentification réussie');
    return true;
}

// Ajouter un membre
function addMember(memberData) {
    const newMember = {
        id: nextMemberId++,
        name: memberData.name,
        role: memberData.role,
        email: memberData.email,
        bio: memberData.bio,
        photo: "images/default-avatar.jpg",
        skills: ["Nouveau membre"],
        isOriginal: false
    };
    
    teamMembers.push(newMember);
    displayTeam();
    setupEventListeners();
    
    console.log('➕ Nouveau membre ajouté:', newMember);
}

// Supprimer un membre
function deleteMember(memberId) {
    const member = teamMembers.find(m => m.id === memberId);
    
    if (member && member.isOriginal) {
        alert('Impossible de supprimer un membre original de l\'équipe');
        return;
    }
    
    const confirmDelete = confirm(`Êtes-vous sûr de vouloir supprimer ${member.name} ?`);
    
    if (confirmDelete) {
        teamMembers = teamMembers.filter(m => m.id !== memberId);
        displayTeam();
        setupEventListeners();
        console.log('🗑️ Membre supprimé:', member);
    }
}

// Éditer le nom d'un membre
function editMemberName(memberId) {
    if (!isEditMode) return;
    
    const member = teamMembers.find(m => m.id === memberId);
    const modal = document.getElementById('editMemberModal');
    
    document.getElementById('editMemberId').value = memberId;
    document.getElementById('editMemberName').value = member.name;
    
    modal.classList.add('active');
}

// Setup des événements
function setupEventListeners() {
    // Bouton mode édition
    const editModeBtn = document.getElementById('editModeBtn');
    editModeBtn.onclick = function() {
        if (!isEditMode) {
            if (authenticateEditMode()) {
                toggleEditMode();
            }
        } else {
            toggleEditMode();
        }
    };
    
    // Boutons de suppression
    const deleteButtons = document.querySelectorAll('.btn-delete-member');
    deleteButtons.forEach(btn => {
        btn.onclick = function() {
            const memberId = parseInt(this.getAttribute('data-member-id'));
            deleteMember(memberId);
        };
    });
    
    // Noms éditables
    const memberNames = document.querySelectorAll('.member-name');
    memberNames.forEach(name => {
        name.onclick = function() {
            if (isEditMode) {
                const memberId = parseInt(this.getAttribute('data-member-id'));
                editMemberName(memberId);
            }
        };
    });
}

// Formulaire d'ajout de membre
function setupAddMemberForm() {
    const addMemberBtn = document.getElementById('addMemberBtn');
    const modal = document.getElementById('addMemberModal');
    const closeBtn = document.getElementById('modalCloseAdd');
    const form = document.getElementById('addMemberForm');
    
    addMemberBtn.onclick = function() {
        modal.classList.add('active');
    };
    
    closeBtn.onclick = function() {
        modal.classList.remove('active');
    };
    
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    };
    
    form.onsubmit = function(e) {
        e.preventDefault();
        
        const memberData = {
            name: document.getElementById('newMemberName').value,
            role: document.getElementById('newMemberRole').value,
            email: document.getElementById('newMemberEmail').value,
            bio: document.getElementById('newMemberBio').value
        };
        
        addMember(memberData);
        form.reset();
        modal.classList.remove('active');
    };
}

// Formulaire d'édition de membre
function setupEditMemberForm() {
    const modal = document.getElementById('editMemberModal');
    const closeBtn = document.getElementById('modalCloseEdit');
    const form = document.getElementById('editMemberForm');
    
    closeBtn.onclick = function() {
        modal.classList.remove('active');
    };
    
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    };
    
    form.onsubmit = function(e) {
        e.preventDefault();
        
        const memberId = parseInt(document.getElementById('editMemberId').value);
        const newName = document.getElementById('editMemberName').value;
        
        const member = teamMembers.find(m => m.id === memberId);
        if (member) {
            member.name = newName;
            displayTeam();
            setupEventListeners();
            console.log('✏️ Nom modifié:', member);
        }
        
        modal.classList.remove('active');
    };
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    displayTeam();
    setupEventListeners();
    setupAddMemberForm();
    setupEditMemberForm();
});
