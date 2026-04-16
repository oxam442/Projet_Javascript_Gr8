
function changeImg(image){
    let id=image.id;
    let nb=image.dataset.nb;
    let cpt = Math.floor(Math.random()*nb)+1;
    image.src = `../images/${id}${cpt}.png`;
}

function achat(){
    let largeur = 600;
    let hauteur = 400;
    let left = (window.screen.width - largeur) / 2;
    let top = (window.screen.height - hauteur) / 2;
    window.open(
        "acheter.html",
        "popup",
        `width=${largeur},height=${hauteur},left=${left},top=${top}`
    );
}

 