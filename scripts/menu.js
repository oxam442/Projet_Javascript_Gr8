function plagiat(){
    console.log("Attention au plagiat.");
}

// barre de recherche
function backgroundColor(lien){
    // change la couleur du fond
    lien.style.background="var(--primary-color)";
    // ajout zone de remplissage autour du contenu
    lien.style.padding="1%";
    // affiche les message dans la cosole des changements de couleurs du fond
    console.log("L'ancienne couleur du fond est #1a1a2e.");
    console.log("La nouvelle couleur du fond est #ff6b35.");
}

function changePage(event,page){
    // récupère le lien de la prochaine page
    let url = page.href;
    // bloque la page pour l'instant
    event.preventDefault();
    // affiche le loader et le popup
    let popup= document.getElementById("popupLoader");
        let content= `
        <div class="popup">
            <p>Chargement en cours...</p>
            <div class="loader"></div>
        </div>
    `;
    popup.innerHTML=content;
    popup.style.display="flex";

    // attend 2 seconde pour passer à la prochaine page
    setTimeout(()=>{
        window.location.href=url;
    },2000);
}

function changeEquipeConfirm(event){
    event.preventDefault();
    // affiche le popup
    let popup= document.getElementById("popupConfirm");
        let content= `
        <div class="popup">
            <div id="buttonclose" onclick="modalClose()">X</div>
            <p>Voulez-vous aller vers cette page ?</p>
            <a href="equipe.html">
                <button id="oui" onclick="changePageEquipe(event,this), backgroundColor(this)">OUI</button>
            </a>
        </div>
    `;
    popup.innerHTML=content;
    popup.style.display="flex";
}

function changePageEquipe(event,page){
    // bloque la page pour l'instant
    event.preventDefault();
    // cache la page de confirmation
    document.getElementById("popupConfirm").style.display="none";
    // récupère le lien de la prochaine page
    let url = page.parentElement.href;
    // affiche le loader et le popup
    let popup= document.getElementById("popupLoader");
        let content= `
        <div class="popup">
            <p>Chargement en cours...</p>
            <div class="loader"></div>
        </div>
    `;
    popup.innerHTML=content;
    popup.style.display="flex";
    // attend 2 seconde pour passer à la prochaine page
    setTimeout(()=>{
        window.location.href=url;
    },2000);
}

// horloge
function horloge(){
    // récupère l'id de l'horloge et du chronomètre
    let horloge = document.getElementById("horloge");
    let timer = 0;
    setInterval(()=>{
    const time = new Date();
    // ajoute une seconde
    timer++;
    let minuteChrono = Math.floor(timer/60);
    let secondeChrono = timer % 60;
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
    let audio = document.getElementById("audio");
    audio.play();
    setTimeout(()=>{
        audio.pause();
    },5000);
    console.log("vous appelez ce numéro : "+ numeroTel);

    document.getElementById("popupTelephone").style.display="none";
}


// permet de fermer la page popup
function modalClose(){
    document.getElementById("popupMission").style.display="none";
    document.getElementById("popupConfirm").style.display="none";
    document.getElementById("menu").children[4].style.background="var(--dark-color)";
}


