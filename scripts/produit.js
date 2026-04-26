// fonction pour changer aléatoirement d'image 
function changeImg(image){
    // récupération id
    let id=image.id;
    // récupération du nombre d'image
    let nb=image.dataset.nb;
    // génération d'un nombre aléatoire entre le nombre d'image
    let cpt = Math.floor(Math.random()*nb)+1;
    // changement de l'url de l'image pour changer l'image
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

 