function background(img){
    // change la couleur du fond
    img.style.background="#e96b0b";
    // ajout zone de remplissage autour du contenu
    img.style.padding="15px";
    // affiche les message dans la cosole des changements de couleurs du fond
    console.log("L'ancienne couleur du fond est bleu nuit.");
    console.log("La nouvelle couleur du fond est #e96b0b.");
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


// horloge
function horloge(){
    // récupère l'id de l'horloge et du chronomètre
    let horloge = document.getElementById("horloge");
    //  définition variable minute et seconde
    let minuteChrono = 0;
    let secondeChrono = 0;
    setInterval(()=>{
    const time = new Date();
    // ajoute une seconde
    secondeChrono++;
    if (secondeChrono==60){
        // passage des secondes en minutes
        minuteChrono++;
        secondeChrono=0;
    }
    // affichage de l'horloge et du chronomètre
    horloge.innerText=`${time.toLocaleTimeString('fr-FR')} | ${String(minuteChrono).padStart(2,"0")}:${String(secondeChrono).padStart(2,"0")}s`;}
    ,1000);
}
horloge();


// telephone
let numeroTel=null;
function stockNum(numero){
    numeroTel= numero.dataset.tel;
}

function changeTel(){
    let tel=document.getElementById("popupTelephone");
    tel.style.display="flex";
    tel.firstElementChild.firstElementChild.textContent=`Confirmer le numéro suivant ${numeroTel}.`;
}

function verificationTel(){
    let value=document.getElementById("value").value;
    if (value==numeroTel){
        document.getElementById("boutonTelephone").addEventListener("click", appel);
    }
    else{
        document.getElementById("boutonTelephone").removeEventListener("click", appel)
    }
}

function appel(){
    console.log("vous appelez ce numéro : "+ numeroTel);

    document.getElementById("popupTelephone").style.display="none";
}
