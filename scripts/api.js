// let apiKey ="3b4590d54a1faf4a2cfe7968d35b4458"
// function wheaterNantes(){
//     let url = `wheatherhttps://api.openweathermap.org/data/2.5/weather?lat=47.27498284018277&lon=-1.5047302381105974&appid=${apiKey}&units=metric&lang=fr`;
    // fetch(url)
    //         .then(response => response.json())
    //         .then(data=>console.log(data.main.temp),console.log(data.main.humidity))
    //         .catch(error=>console.log("error"))
// }
// function wheatherRennes(){
//     let url = `https://api.openweathermap.org/data/2.5/weather?lat48.103672136370506&l-1.688873778655169&appid=${apiKey}&units=metric&lang=fr`;
    // fetch(url)
    //         .then(response => response.json())
    //         .then(data=>console.log(data.main.temp),console.log(data.main.humidity))
    //         .catch(error=>console.log("error"))
// }
// function wheatherParis(){
//     let url = `https://api.openweathermap.org/data/2.5/weather?lat=48.75453694543394&lon=2.2977760815593955&appid=${apiKey}&units=metric&lang=fr`;
    // fetch(url)
    //         .then(response => response.json())
    //         .then(data=>console.log(data.main.temp),console.log(data.main.humidity))
    //         .catch(error=>console.log("error"))
// }
// async function wheatherCaen(){
//     let url = `https://api.openweathermap.org/data/2.5/weather?lat=49.17750012138071&lon=-0.35294864725071345&appid=${apiKey}&units=metric&lang=fr`;
    // fetch(url)
    //         .then(response => response.json())
    //         .then(data=>console.log(data.main.temp),console.log(data.main.humidity))
    //         .catch(error=>console.log("error"))
// }
// function wheatherBrest(){
//     let url = `https://api.openweathermap.org/data/2.5/weather?lat48.407212058714826&lon=-4.495478901267324&appid=${apiKey}&units=metric&lang=fr`;
    // fetch(url)
    //         .then(response => response.json())
    //         .then(data=>console.log(data.main.temp),console.log(data.main.humidity))
    //         .catch(error=>console.log("error"))

// }

function map(){
   var map = L.map('map').setView([47.996655422448725, 0.20076435392140918],7);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([47.295961634415434, -1.5069011174733398]).addTo(map).bindPopup('ISEN Nantes');
    L.marker([48.1037007945787, -1.6888737786551489]).addTo(map).bindPopup('ISEN Rennes');
    L.marker([48.44350782421845, -4.495554048237868]).addTo(map).bindPopup('ISEN Brest');
    L.marker([49.17754212934855, -0.3529379358863937]).addTo(map).bindPopup('ISEN Caen');
    L.marker([48.83633275083328, 2.249349284695098]).addTo(map).bindPopup('ISEN Paris');
    navigator.geolocation.getCurrentPosition((position)=>{
        L.marker([position.coords.latitude,position.coords.longitude], {color:'red', fillColor:'red'}).addTo(map).bindPopup('Ma position')});
}
map();

