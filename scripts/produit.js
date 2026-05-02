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


function changeAchat(){
    // affiche le popup de confirmation 
    document.getElementById("popupAchat").style.display="flex";
}
 
function changeSmiley(){
    // cache le popup d'achat
    document.getElementById("popupAchat").style.display="none";
    // affiche le popup du smiley 
    document.getElementById("popupSmiley").style.display="flex";
    setTimeout(()=>{
        document.getElementById("popupSmiley").style.display="none";
    },3000);
}