let apiKey ="3b4590d54a1faf4a2cfe7968d35b4458"
// base de donnée
const ville= [
    {nom:"Nantes", lat:47.27498284018277, lon:-1.5047302381105974},
    {nom:"Brest", lat:48.407212058714826, lon:-4.495478901267324},
    {nom:"Caen", lat:49.17750012138071, lon:-0.35294864725071345},
    {nom:"Paris", lat:48.7545369454339, lon:2.2977760815593955},
    {nom:"Rennes", lat:48.103672136370506, lon:-1.688873778655169}
]
// fonction pour afficher la meteo 
function weather(nom,latitude, longitude){
    // lien pour obtenir les infos
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=fr`;
    // lire les données de l'url
    fetch(url)
        // transforme le ficheir obtenu en fichier json
        .then(response => response.json())
        // affiche la température
        .then(data=>{document.getElementById("api"+nom).children[1].textContent=`Température : ${data.main.temp} °C`})
        // sinon affiche un message d'erreur
        .catch(error=>console.log("error"))
}

// definition variable
let lon=0;
let lat=0;

// fonction pour afficher la carte et la position de chaque ville avec leaflet
function map(nom,latitude, longitude){
    // setup la carte 
    var map = L.map('map'+ nom).setView([47.996655422448725, 0.20076435392140918],6);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    // affiche la position de l'école grace à un pointeur
    L.marker([latitude, longitude]).addTo(map).bindPopup('ISEN '+ nom);
    // récupere nos coordonnée et affiche la position et ajoute un pointeur sur la carte
    navigator.geolocation.getCurrentPosition((position)=>{
        lat=position.coords.latitude,
        lon=position.coords.longitude,
        L.marker([lat,lon]).addTo(map).bindPopup('Ma position')
    });

}    

// function pour afficher la distance entre notre position et l'école 
function distance(number){
    // récupération des coordonnée
    let p1 = L.latLng(lat, lon);
    let p2=L.latLng(ville[number].lat,ville[number].lon);
    // calcul la distance en km
    let distance=p1.distanceTo(p2)/1000;
    // affiche la distance 
    document.getElementById("api"+ville[number].nom).children[3].textContent=`la distance est de : ${distance} km`;
}

// function main pour appliquer chaque fonction pour les 5 écoles
function main(){
    for (let i=0;i<ville.length;i++){
        let v=ville[i];
        weather(ville[i].nom,ville[i].lat,ville[i].lon);
        map(ville[i].nom,ville[i].lat,ville[i].lon);
    }
}
main();


