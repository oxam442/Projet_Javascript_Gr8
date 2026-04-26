function background(img){
    // change la couleur du fond
    img.style.background="red";
    // ajout zone de remplissage autour du contenu
    img.style.padding="15px";
    // affiche les message dans la cosole des changements de couleurs du fond
    console.log("L'ancienne couleur du fond est bleu nuit.");
    console.log("La nouvelle couleur du fond est rouge.");
}

function changePage(event,page){
    // récupère le lien de la prochaine page
    let url = page.href;
    // bloque la page pour l'instant
    event.preventDefault();
    // affiche le loader
    document.getElementById("popup").style.display="flex";
    // attend 2 seconde pour passer à la prochaine page
    setTimeout(()=>{
        window.location.href=url;
    },2000);
}