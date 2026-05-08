// Données des produits - Catégorie 1: Logiciels
const softwareProducts = [
    {
        id: 1,
        name: "CowalkZilla Pro",
        category: "logiciels",
        theme: "collaboration",
        description: "La solution complète de collaboration en temps réel pour les équipes modernes. Tableaux partagés, visioconférence intégrée, et gestion de tâches avancée.",
        price: 29.99,
        date: "2026-01-15",
        image1: "images/product1-1.jpg",
        image2: "images/product1-2.jpg"
    },
    {
        id: 2,
        name: "TalkMaster Suite",
        category: "logiciels",
        theme: "communication",
        description: "Plateforme de communication unifiée avec messagerie instantanée, appels vidéo HD, et partage d'écran. Parfait pour les équipes distribuées.",
        price: 19.99,
        date: "2025-11-20",
        image1: "images/product2-1.jpg",
        image2: "images/product2-2.jpg"
    },
    {
        id: 3,
        name: "ProjectRoar",
        category: "logiciels",
        theme: "gestion",
        description: "Gérez vos projets comme un monstre ! Planification agile, diagrammes de Gantt, suivi du temps, et rapports personnalisables pour une productivité maximale.",
        price: 39.99,
        date: "2026-03-10",
        image1: "images/product3-1.jpg",
        image2: "images/product3-2.jpg"
    },
    {
        id: 4,
        name: "DocCollabZilla",
        category: "logiciels",
        theme: "collaboration",
        description: "Éditeur de documents collaboratif avec versioning automatique, commentaires en temps réel, et intégration cloud. Travaillez ensemble sans friction.",
        price: 15.99,
        date: "2025-09-05",
        image1: "images/product4-1.jpg",
        image2: "images/product4-2.jpg"
    },
    {
        id: 5,
        name: "TeamAnalytics Pro",
        category: "logiciels",
        theme: "gestion",
        description: "Analysez les performances de votre équipe avec des tableaux de bord interactifs, des métriques en temps réel, et des rapports intelligents basés sur l'IA.",
        price: 49.99,
        date: "2026-02-28",
        image1: "images/product5-1.jpg",
        image2: "images/product5-2.jpg"
    }
];

// Données des produits - Catégorie 2: Services
const serviceProducts = [
    {
        id: 6,
        name: "Formation Équipe Agile",
        category: "services",
        theme: "formation",
        description: "Formation intensive de 3 jours pour transformer votre équipe en machine agile. Inclut certification Scrum Master et support post-formation pendant 3 mois.",
        price: 1499.99,
        date: "2026-04-15",
        image1: "images/service1-1.jpg",
        image2: "images/service1-2.jpg"
    },
    {
        id: 7,
        name: "Consulting Transformation Digitale",
        category: "services",
        theme: "consulting",
        description: "Accompagnement personnalisé pour digitaliser vos processus. Audit complet, roadmap stratégique, et implémentation sur mesure avec nos experts.",
        price: 2999.99,
        date: "2026-01-20",
        image1: "images/service2-1.jpg",
        image2: "images/service2-2.jpg"
    },
    {
        id: 8,
        name: "Support Premium 24/7",
        category: "services",
        theme: "collaboration",
        description: "Service de support dédié disponible 24h/24 et 7j/7. Assistance prioritaire, gestionnaire de compte personnel, et temps de réponse garanti sous 1h.",
        price: 199.99,
        date: "2025-12-01",
        image1: "images/service3-1.jpg",
        image2: "images/service3-2.jpg"
    },
    {
        id: 9,
        name: "Atelier Team Building",
        category: "services",
        theme: "formation",
        description: "Séance interactive pour renforcer la cohésion d'équipe. Jeux collaboratifs, ateliers de résolution de problèmes, et débriefing stratégique.",
        price: 899.99,
        date: "2026-03-05",
        image1: "images/service4-1.jpg",
        image2: "images/service4-2.jpg"
    },
    {
        id: 10,
        name: "Audit de Productivité",
        category: "services",
        theme: "consulting",
        description: "Analyse approfondie de vos workflows avec recommandations concrètes. Rapport détaillé incluant benchmarks sectoriels et plan d'action prioritaire.",
        price: 599.99,
        date: "2026-02-10",
        image1: "images/service5-1.jpg",
        image2: "images/service5-2.jpg"
    }
];

// Tous les produits combinés
let allProducts = [...softwareProducts, ...serviceProducts];
let currentImageState = {}; // Pour suivre l'état des images (image1 ou image2)

// Fonction pour créer une carte produit
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-id', product.id);
    card.setAttribute('data-category', product.category);
    card.setAttribute('data-theme', product.theme);
    card.setAttribute('data-price', product.price);
    card.setAttribute('data-date', product.date);
    card.setAttribute('data-name', product.name.toLowerCase());
    
    // Initialiser l'état de l'image
    currentImageState[product.id] = 1;
    
    card.innerHTML = `
        <div class="product-image-wrapper" data-product-id="${product.id}">
            <img src="${product.image1}" alt="${product.name}" class="product-image" 
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect width=%22400%22 height=%22300%22 fill=%22%23f0f0f0%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-size=%2220%22%3EImage%3C/text%3E%3C/svg%3E'">
        </div>
        <div class="product-content">
            <div class="product-header">
                <h3 class="product-name">${product.name}</h3>
                <span class="product-theme">${product.theme}</span>
            </div>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <div>
                    <div class="product-price">${product.price.toFixed(2)} €<span style="font-size: 0.6em;">/mois</span></div>
                    <div class="product-date">Depuis ${formatDate(product.date)}</div>
                </div>
                <button class="btn-buy" data-product-id="${product.id}" data-product-name="${product.name}">
                    Acheter
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Fonction pour formater la date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('fr-FR', options);
}

// Fonction pour afficher les produits
function displayProducts() {
    const softwareContainer = document.getElementById('softwareProducts');
    const serviceContainer = document.getElementById('serviceProducts');
    
    // Vider les conteneurs
    softwareContainer.innerHTML = '';
    serviceContainer.innerHTML = '';
    
    // Ajouter les logiciels
    softwareProducts.forEach(product => {
        softwareContainer.appendChild(createProductCard(product));
    });
    
    // Ajouter les services
    serviceProducts.forEach(product => {
        serviceContainer.appendChild(createProductCard(product));
    });
    
    // Setup des événements
    setupImageToggle();
    setupPurchaseButtons();
}

// Fonction pour alterner les images au clic
function setupImageToggle() {
    const imageWrappers = document.querySelectorAll('.product-image-wrapper');
    
    imageWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));
            const img = this.querySelector('.product-image');
            const product = allProducts.find(p => p.id === productId);
            
            if (!product) return;
            
            // Alterner entre image1 et image2
            if (currentImageState[productId] === 1) {
                img.src = product.image2;
                currentImageState[productId] = 2;
            } else {
                img.src = product.image1;
                currentImageState[productId] = 1;
            }
        });
    });
}

// Fonction pour gérer les achats
function setupPurchaseButtons() {
    const buyButtons = document.querySelectorAll('.btn-buy');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productName = this.getAttribute('data-product-name');
            showPurchaseConfirmation(productName);
        });
    });
}

// Fonction pour afficher la confirmation d'achat avec Canvas
function showPurchaseConfirmation(productName) {
    const canvas = document.getElementById('purchaseCanvas');
    const ctx = canvas.getContext('2d');
    
    // Configurer les dimensions du canvas
    canvas.width = 500;
    canvas.height = 200;
    canvas.style.display = 'block';
    canvas.style.position = 'fixed';
    canvas.style.top = '50%';
    canvas.style.left = '50%';
    canvas.style.transform = 'translate(-50%, -50%)';
    canvas.style.zIndex = '10000';
    canvas.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
    canvas.style.borderRadius = '10px';
    
    // Fond bleu
    ctx.fillStyle = '#4169e1';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Dessiner un smiley content
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(100, 100, 60, 0, Math.PI * 2);
    ctx.fill();
    
    // Yeux
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(85, 85, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(115, 85, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Sourire
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(100, 100, 35, 0, Math.PI, false);
    ctx.stroke();
    
    // Texte
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Vous avez acheté', 180, 80);
    ctx.fillText('ce produit !', 180, 110);
    
    // Nom du produit
    ctx.font = '16px Arial';
    ctx.fillText(`"${productName}"`, 180, 140);
    
    // Cacher après 3 secondes
    setTimeout(() => {
        canvas.style.display = 'none';
    }, 3000);
    
    console.log(`✅ Produit acheté : ${productName}`);
}

// Fonction de filtrage
function applyFilters() {
    const nameFilter = document.getElementById('filterName').value.toLowerCase();
    const categoryFilter = document.getElementById('filterCategory').value;
    const themeFilter = document.getElementById('filterTheme').value;
    const priceMin = parseFloat(document.getElementById('filterPriceMin').value) || 0;
    const priceMax = parseFloat(document.getElementById('filterPriceMax').value) || Infinity;
    
    const productCards = document.querySelectorAll('.product-card');
    let visibleCount = 0;
    
    productCards.forEach(card => {
        const name = card.getAttribute('data-name');
        const category = card.getAttribute('data-category');
        const theme = card.getAttribute('data-theme');
        const price = parseFloat(card.getAttribute('data-price'));
        
        const matchesName = !nameFilter || name.includes(nameFilter);
        const matchesCategory = !categoryFilter || category === categoryFilter;
        const matchesTheme = !themeFilter || theme === themeFilter;
        const matchesPrice = price >= priceMin && price <= priceMax;
        
        if (matchesName && matchesCategory && matchesTheme && matchesPrice) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Afficher un message si aucun résultat
    updateNoResultsMessage(visibleCount);
    
    console.log(`Filtres appliqués : ${visibleCount} produit(s) affiché(s)`);
}

// Fonction pour afficher/masquer le message "aucun résultat"
function updateNoResultsMessage(visibleCount) {
    const softwareContainer = document.getElementById('softwareProducts');
    const serviceContainer = document.getElementById('serviceProducts');
    
    // Supprimer les anciens messages
    document.querySelectorAll('.no-results').forEach(el => el.remove());
    
    if (visibleCount === 0) {
        const noResultsHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <p>Aucun produit ne correspond à vos critères de recherche.</p>
                <p>Essayez de modifier vos filtres.</p>
            </div>
        `;
        softwareContainer.innerHTML = noResultsHTML;
        serviceContainer.innerHTML = '';
    }
}

// Fonction pour réinitialiser les filtres
function resetFilters() {
    document.getElementById('filterForm').reset();
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => card.classList.remove('hidden'));
    updateNoResultsMessage(productCards.length);
    console.log('Filtres réinitialisés');
}

// Fonction pour le bouton scroll to top
function setupScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    setupScrollToTop();
    
    // Événements des filtres
    document.getElementById('applyFilters').addEventListener('click', applyFilters);
    document.getElementById('resetFilters').addEventListener('click', resetFilters);
    
    // Appliquer les filtres en temps réel sur les champs de texte
    document.getElementById('filterName').addEventListener('input', applyFilters);
});
