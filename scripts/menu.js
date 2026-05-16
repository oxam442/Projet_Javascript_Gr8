function plagiat(){
    console.log("Attention au plagiat.");
}

// menu
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

function changeEquipe(event,page){
    // bloque la page pour l'instant
    event.preventDefault();
    // récupère le lien de la prochaine page
    let url = page.href;
    // affiche le loader et le popup
    let popup= document.getElementById("popupLoader");
    let content= `
        <div class="popup">
            <p>Chargement en cours...</p>
            <div class="loader"></div>
        </div>
    `;
    popup.innerHTML=content;
    // attend 2 seconde pour passer à la prochaine page
    if (confirm("Voulez-vous allez vers cette page ?")){
        popup.style.display="flex";
        backgroundColor(page);
        setTimeout(()=>{
            window.location.href=url;
        },2000);
    }

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


// Footer
let numeroTel=null;
// fonction pour stocker le numero de téléphone
function stockNum(numero){
    numeroTel= numero.dataset.tel;
}

// fonction pour afficher la page pour comfirmer l'appel
function changePageTel(){
    // recuperation id
    let popup= document.getElementById("popupTelephone");
    // contenu à afficher
    let content= `
        <div class="popup">
            <div id="buttonclose" onclick="modalClose()">X</div>
            <div style="margin-bottom:8px">Confirmer le numéro suivant ${numeroTel}.</div>
            <input type="text" oninput="verificationNum()" id="value" placeholder="Numero à entrée">
            <audio id="audio" src="../son_appel.mp3"></audio> 
            <button id="buttonTelephone">Appeler</button>
            <div style="text-align:left; font-size:8px; font-style: italic; padding:2px">* ne pas mettre le son trop fort</div>
        </div>
    `;
    // affichage du contenu
    popup.innerHTML=content;
    popup.style.display="flex";
}

// fonction pour vérifier si le numéro est bon
function verificationNum(){
    let value=document.getElementById("value").value;
    if (value==numeroTel){
        document.getElementById("buttonTelephone").addEventListener("click", appelNum);
    }
    else{
        document.getElementById("buttonTelephone").removeEventListener("click", appelNum);
    }
}

// fonction pour appeler le numéro et l'afficher dans la console 
function appelNum(){
    let audio = document.getElementById("audio");
    // lance l'audio 
    audio.play();
    setTimeout(()=>{
        // arrete l'audio 
        audio.pause();
        document.getElementById("popupTelephone").style.display="none";
    },5000);
    console.log("vous appelez ce numéro : "+ numeroTel);
   
}


// permet de fermer les popup 
function modalClose(){
    document.getElementById("popupTelephone").style.display="none";
    document.getElementById("menu").children[4].style.background="var(--dark-color)";
    if (document.title == "Produits/services - CoWalkZilla"){
        document.getElementById("popupError").style.display="none";
        document.getElementById("popupAchat").style.display="none";
    }
    if(document.title == "Équipe - CowalkZilla"){
        document.getElementById("popupAddMember").style.display="none";
        document.getElementById("popupModifMember").style.display="none";
    }
    if(document.title == "À propos - CoWalkZilla"){
        document.getElementById("popupMission").style.display="none";
    }
}
