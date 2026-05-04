// Script spécifique à la page d'accueil

// Animation du slogan
function animateSlogan() {
    const sloganElement = document.getElementById('slogan');
    if (!sloganElement) return;
    
    const sloganText = 'Talk Walk Rwar';
    const words = sloganText.split(' ');
    let currentWordIndex = 0;
    let currentText = '';
    
    function displayNextWord() {
        if (currentWordIndex < words.length) {
            currentText += (currentWordIndex > 0 ? ' ' : '') + words[currentWordIndex];
            sloganElement.textContent = currentText;
            sloganElement.style.opacity = '1';
            currentWordIndex++;
            
            setTimeout(displayNextWord, 1000);
        } else {
            // Tous les mots sont affichés, lancer l'animation de translation
            setTimeout(() => {
                sloganElement.classList.add('animate');
                
                // Après l'animation, effacer et recommencer
                setTimeout(() => {
                    sloganElement.classList.remove('animate');
                    sloganElement.style.opacity = '0';
                    currentWordIndex = 0;
                    currentText = '';
                    
                    setTimeout(displayNextWord, 1000);
                }, 2000);
            }, 1000);
        }
    }
    
    displayNextWord();
}

// Gestion du zoom de l'image hero
function setupHeroImageZoom() {
    const heroImage = document.getElementById('heroImage');
    if (!heroImage) return;
    
    let isZoomed = false;
    
    heroImage.addEventListener('click', function() {
        isZoomed = !isZoomed;
        if (isZoomed) {
            this.style.transform = 'scale(2)';
        } else {
            this.style.transform = 'scale(1)';
        }
    });
    
    heroImage.addEventListener('mouseover', function() {
        if (!isZoomed) {
            this.style.transform = 'scale(2)';
        }
    });
    
    heroImage.addEventListener('mouseout', function() {
        if (!isZoomed) {
            this.style.transform = 'scale(1)';
        }
    });
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', function() {
    animateSlogan();
    setupHeroImageZoom();
});
