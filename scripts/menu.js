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
    document.getElementById("popupLoader").style.display="flex";
    // attend 2 seconde pour passer à la prochaine page
    setTimeout(()=>{
        window.location.href=url;
    },2000);
}

function changePageEquipe(event,page){
    // bloque la page pour l'instant
    event.preventDefault();
    // cache la page de confirmation
    document.getElementById("popupConfirm").style.display="none";
    // récupère le lien de la prochaine page
    let url = page.parentElement.href;
    // affiche le loader
    document.getElementById("popupLoader").style.display="flex";
    // attend 2 seconde pour passer à la prochaine page
    setTimeout(()=>{
        window.location.href=url;
    },2000);
}

function changeConfirm(event){
    event.preventDefault();
    // affiche la page de confirmation 
    document.getElementById("popupConfirm").style.display="flex";
}

function confirmCancel(){
    // enleve l'affichage de la page de comfirmation
    document.getElementById("popupConfirm").style.display="none";
    document.getElementById("menu").children[4].style.background="#0e1f5a";
}

function plagiat(){
    console.log("Attention au plagiat.");
}

function timer(){
    // récupère l'id du timer
    let timer = document.getElementById("timer");
    //  définition variable minute et seconde
    let minute = 0;
    let seconde = 0;

    setInterval(()=>{
    if (seconde==59){
        // passage des secondes en minutes
        minute++;
        seconde=0;
    }
    else{
        //  ajoute une seconde
        seconde++;
    }
    // affichage du timer
    timer.innerText=`timer : ${String(minute).padStart(2,"0")}:${String(seconde).padStart(2,"0")}`}
    ,1000);
}
timer();