// Coordonnées des campus ISEN
const campusData = {
    nantes: {
        name: "ISEN Yncréa Ouest - Nantes",
        lat: 47.2639,
        lng: -1.5156,
        address: "33 Avenue du Champ de Manœuvres, 44470 Carquefou",
        phone: "+33 2 40 52 40 52",
        city: "Nantes"
    },
    brest: {
        name: "ISEN Yncréa Ouest - Brest",
        lat: 48.3905,
        lng: -4.4861,
        address: "2 Rue François Verny, 29200 Brest",
        phone: "+33 2 98 03 84 00",
        city: "Brest"
    },
    caen: {
        name: "ISEN Yncréa Ouest - Caen",
        lat: 49.1829,
        lng: -0.3707,
        address: "8 Avenue Croix Guérin, 14000 Caen",
        phone: "+33 2 31 45 27 00",
        city: "Caen"
    },
    rennes: {
        name: "ISEN Yncréa Ouest - Rennes",
        lat: 48.1173,
        lng: -1.6778,
        address: "2 Rue Robert d'Arbrissel, 35000 Rennes",
        phone: "+33 2 99 27 25 00",
        city: "Rennes"
    }
};

let map;
let markers = {};
let userLocation = null;

// Initialiser la carte OpenStreetMap
function initializeMap() {
    // Centrer sur la France (position moyenne des campus)
    map = L.map('map').setView([47.5, -2.0], 7);

    // Ajouter la couche OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    // Ajouter les marqueurs pour chaque campus
    Object.keys(campusData).forEach(key => {
        const campus = campusData[key];
        
        // Créer un marqueur
        const marker = L.marker([campus.lat, campus.lng]).addTo(map);
        
        // Créer le contenu du popup
        const popupContent = `
            <div class="popup-content">
                <h3>${campus.name}</h3>
                <p>${campus.address}</p>
                <p><a href="tel:${campus.phone}">${campus.phone}</a></p>
                <p><a href="https://www.openstreetmap.org/directions?from=&to=${campus.lat},${campus.lng}" target="_blank">
                    🗺️ Obtenir l'itinéraire
                </a></p>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        markers[key] = marker;
    });

    console.log('🗺️ Carte initialisée avec', Object.keys(campusData).length, 'campus');
}

// Obtenir la météo pour une ville
async function getWeather(city, elementId) {
    const weatherElement = document.getElementById(elementId);
    
    try {
        // Utiliser l'API Open-Meteo (gratuite, sans clé API requise)
        const campus = campusData[city];
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${campus.lat}&longitude=${campus.lng}&current_weather=true`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.current_weather) {
            const weather = data.current_weather;
            const temp = Math.round(weather.temperature);
            const weatherCode = weather.weathercode;
            
            // Convertir le code météo en description et icône
            const weatherInfo = getWeatherInfo(weatherCode);
            
            weatherElement.innerHTML = `
                <div class="weather-display">
                    <div>
                        <div class="weather-temp">${temp}°C</div>
                        <div class="weather-desc">${weatherInfo.description}</div>
                    </div>
                    <div class="weather-icon">${weatherInfo.icon}</div>
                </div>
            `;
            
            console.log(`☀️ Météo ${campus.city}: ${temp}°C - ${weatherInfo.description}`);
        }
    } catch (error) {
        console.error(`❌ Erreur lors de la récupération de la météo pour ${city}:`, error);
        weatherElement.innerHTML = `
            <div class="weather-display">
                <div class="weather-temp">--°C</div>
                <div class="weather-desc">Non disponible</div>
            </div>
        `;
    }
}

// Convertir le code météo en description et icône
function getWeatherInfo(code) {
    const weatherCodes = {
        0: { description: "Ciel dégagé", icon: "☀️" },
        1: { description: "Plutôt dégagé", icon: "🌤️" },
        2: { description: "Partiellement nuageux", icon: "⛅" },
        3: { description: "Couvert", icon: "☁️" },
        45: { description: "Brouillard", icon: "🌫️" },
        48: { description: "Brouillard givrant", icon: "🌫️" },
        51: { description: "Bruine légère", icon: "🌦️" },
        53: { description: "Bruine modérée", icon: "🌦️" },
        55: { description: "Bruine dense", icon: "🌧️" },
        61: { description: "Pluie légère", icon: "🌧️" },
        63: { description: "Pluie modérée", icon: "🌧️" },
        65: { description: "Forte pluie", icon: "⛈️" },
        71: { description: "Chute de neige légère", icon: "🌨️" },
        73: { description: "Chute de neige modérée", icon: "❄️" },
        75: { description: "Forte chute de neige", icon: "❄️" },
        77: { description: "Grains de neige", icon: "🌨️" },
        80: { description: "Averses légères", icon: "🌦️" },
        81: { description: "Averses modérées", icon: "🌧️" },
        82: { description: "Fortes averses", icon: "⛈️" },
        85: { description: "Averses de neige légères", icon: "🌨️" },
        86: { description: "Averses de neige fortes", icon: "❄️" },
        95: { description: "Orage", icon: "⛈️" },
        96: { description: "Orage avec grêle", icon: "⛈️" },
        99: { description: "Orage avec forte grêle", icon: "⛈️" }
    };
    
    return weatherCodes[code] || { description: "Inconnu", icon: "🌡️" };
}

// Obtenir la position de l'utilisateur
function getUserLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                console.log('📍 Position utilisateur:', userLocation);
                
                // Calculer et afficher les distances
                calculateDistances();
                
                // Optionnel: Ajouter un marqueur pour l'utilisateur
                L.marker([userLocation.lat, userLocation.lng], {
                    icon: L.icon({
                        iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNSIgaGVpZ2h0PSI0MSIgdmlld0JveD0iMCAwIDI1IDQxIj48cGF0aCBmaWxsPSIjRkY2QjM1IiBkPSJNMTIuNSAwQzUuNiAwIDAgNS42IDAgMTIuNWMwIDEuOC40IDMuNiAxLjIgNS4yTDEyLjUgNDFsMTEuMy0yMy4zYy44LTEuNiAxLjItMy40IDEuMi01LjJDMjUgNS42IDE5LjQgMCAxMi41IDB6bTAgMThjLTMgMC01LjUtMi41LTUuNS01LjVTOS41IDcgMTIuNSA3czUuNSAyLjUgNS41IDUuNVMxNS41IDE4IDEyLjUgMTh6Ii8+PC9zdmc+',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41]
                    })
                }).addTo(map).bindPopup('📍 Vous êtes ici');
            },
            function(error) {
                console.warn('⚠️ Impossible d\'obtenir la position:', error.message);
            }
        );
    } else {
        console.warn('⚠️ Géolocalisation non supportée par ce navigateur');
    }
}

// Calculer la distance entre deux points (formule de Haversine)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance;
}

// Calculer et afficher les distances
function calculateDistances() {
    if (!userLocation) return;
    
    Object.keys(campusData).forEach(key => {
        const campus = campusData[key];
        const distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            campus.lat,
            campus.lng
        );
        
        const distanceElement = document.getElementById(`distance-${key}`);
        if (distanceElement) {
            distanceElement.innerHTML = `
                <div class="distance-display">
                    <span class="distance-icon">📏</span>
                    <span>Distance : ${distance.toFixed(1)} km</span>
                </div>
                <div class="user-location">
                    Depuis votre position (${userLocation.lat.toFixed(4)}°, ${userLocation.lng.toFixed(4)}°)
                </div>
            `;
        }
        
        console.log(`📏 Distance ${campus.city}: ${distance.toFixed(1)} km`);
    });
}

// Centrer la carte sur un campus
function centerOnCampus(campusKey) {
    const campus = campusData[campusKey];
    if (campus && map) {
        map.setView([campus.lat, campus.lng], 15);
        markers[campusKey].openPopup();
        
        // Scroll vers la carte
        document.querySelector('.map-section').scrollIntoView({ behavior: 'smooth' });
        
        console.log('🗺️ Carte centrée sur', campus.city);
    }
}

// Configuration des boutons "Voir sur la carte"
function setupMapButtons() {
    const mapButtons = document.querySelectorAll('.btn-view-map');
    
    mapButtons.forEach(button => {
        button.addEventListener('click', function() {
            const campus = this.getAttribute('data-campus');
            centerOnCampus(campus);
        });
    });
}

// Configuration du clic sur les cartes campus
function setupCampusCards() {
    const campusCards = document.querySelectorAll('.campus-card');
    
    campusCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Ne pas déclencher si on clique sur le bouton
            if (e.target.classList.contains('btn-view-map')) return;
            
            const campus = this.getAttribute('data-campus');
            centerOnCampus(campus);
        });
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser la carte
    initializeMap();
    
    // Obtenir la météo pour chaque ville
    getWeather('nantes', 'weather-nantes');
    getWeather('brest', 'weather-brest');
    getWeather('caen', 'weather-caen');
    getWeather('rennes', 'weather-rennes');
    
    // Obtenir la position de l'utilisateur
    getUserLocation();
    
    // Configurer les boutons et cartes
    setupMapButtons();
    setupCampusCards();
});
