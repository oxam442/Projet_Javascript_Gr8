// base de donnée
const equipe = [
    {id:"acv",nom:"Adrien Chambrier Vitre",fonction:"Co-fondateur & programmeur", adresse:"adrien.chambrier-vitre@isen-ouest.yncrea.fr", description:"", img:"../images/acv.jpg"},
    {id:"tt",nom:"Thimothé Tran",fonction:"Co-fondateur & designer", adresse:"thimothe.tran@isen-ouest.yncrea.fr", description:"", img:"../images/tt.jpg"}
]
let isAdmin=false;

// fonction pour afficher les cartes de base
function displayCard(){
    // récpuration id
    let id=document.getElementById("equipe");
    // boucle pour afficher les 2 cartes
    for(let i=0;i<2;i++){
        // contenu à afficher
        let content=`            
        <div class="equipe-card" id="${equipe[i].id}" >
            <div class="scratch-zone">
                <img src="${equipe[i].img}">
                <canvas class="scratch"></canvas>
            </div>
            <div class="equipe-nom" onclick="popupModifName(this)" style="cursor:pointer">${equipe[i].nom}</div>
            <div class="equipe-fonction">${equipe[i].fonction}</div>
            <div class="equipe-mail">${equipe[i].adresse}</div>
            <div>${equipe[i].description}</div>
        </div>
        `;
        // ajout du contenu
        id.innerHTML+=content;
    }
}
// lancement des fonctions
displayCard();
document.querySelectorAll(".scratch-zone canvas").forEach(initScratch);

// fonction pour renseigner les information pour ajouter une carte
function popupAddDisplay(){
    // recuperation id
    let id = document.getElementById("popupAddMember");
    // contenu à afficher
    let content=`
        <div class="popup">
            <div id="buttonclose" onclick="modalClose()">X</div>
            <h3>Ajouter un nouveau membre</h3>
            <div>Nom Complet</div>
            <input type="text" placeholder="Prenom Nom" id="newName">
            <div>Rôle</div>
            <input type="text" placeholder="Rôle" id="newRole">
            <div>Email</div>
            <input type="text" placeholder="email@exemple.com" id="newMail"><br>
            <button id="ajouter" onclick="addCard()">ajouter</button>
        </div>`;
    // affichage du contenu et de la popup
    id.innerHTML=content;
    id.style.display="flex";
}

// fonction pour ajouter un carte en fonction des information rentré dans le popup
function addCard(){
    // recuperation id
    let id=document.getElementById("equipe");
    let popup=document.getElementById("popupAddMember");
    // /cache le popup pour récuperer les infos 
    document.getElementById("popupAddMember").style.display="none";
    // déclaration de variable
    let name = document.getElementById("newName").value;
    let role = document.getElementById("newRole").value;
    let mail = document.getElementById("newMail").value;
    // contenu à afficher
    let content=`            
        <div class="equipe-card" id="">
            <div class="scratch-zone">
                <img src="../images/logo.png">
                <canvas class="scratch"></canvas>
            </div>
            <div class="equipe-nom" onclick="popupModifName(this)">${name}</div>
            <div class="equipe-fonction">${role}</div>
            <div class="equipe-mail">${mail}</div>
            <div class="add-member">
                <button class="buttonSup" onclick="supCard(this)">spprimer</button>
            </div>
        </div>
        `;
    // ajout du contenu après les autres cartes
    id.insertAdjacentHTML("beforeend", content);
    // ajout de la fonction de grattage 
    setTimeout(()=>{
        let canvas=id.querySelectorAll(".scratch-zone canvas");
        initScratch(canvas[canvas.length-1],0);
    })
}

// fonction pour modifier le nom
let currentElement = null;
function popupModifName(element){
    currentElement=element;
    // si on est en mode edit ou non
    if (isAdmin){
        // recuperation id
        let id = document.getElementById("popupModifMember");
        // contenu à afficher
        let content=`
        <div class="popup">
            <div id="buttonclose" onclick="modalClose()">X</div>
            <h3>Modification du nom complet</h3>
            <input type="text" placeholder="Prenom Nom" id="nameModif">
            <button id="ajouter" onclick="modifName()">Modifier</button>
        </div>`;
        // affichage du contenu et de la popup
        id.innerHTML=content;
        id.style.display="flex";
    }
}

// fonction pour modifier le nom
function modifName(){
    document.getElementById("popupModifMember").style.display="none";
    currentElement.textContent=document.getElementById("nameModif").value;
}

// fonction pour passe du mode admin au mode user dans les 2 sens 
function toggleMode(){
    if (!isAdmin){
        passToAdmin();
    }
    else{
        if(confirm("Êtes-vous sûr de vouloir quitter le mode édition ?")){
            passToUser();
        }
    }
}

// fonction pour passer en mode admin
function passToAdmin(){
    // test du nom utilisateur 
    let userName = prompt("Entrez le nom du profil administrateur :");
    if (userName=="admin"){
        // test du mot de passe
        let pwd = prompt("Entrez le mot de passe du profil administrateur :");
        
        if (pwd=="admin_pwd"){
            // passage en mode admin
            document.getElementById("add-member").style.display="flex";
            document.getElementById("edit-mode").style.backgroundColor="var(--primary-color)";
            isAdmin=true;
        }
        else{
            alert("mot de passe incorrect.");
        }
    }
    else{
        alert("nom d'utilisateur incorrect.");
    }
}

// fonction pour passer en mode user
function passToUser(){
    document.getElementById("add-member").style.display="none";
    document.getElementById("edit-mode").style.backgroundColor="var(--secondary-color)";
    isAdmin=false;
}

// fonction pour supprimer un carte
function supCard(id){
    id.parentElement.parentElement.remove();
}

// fonction pour initialiser la zone de grattage
function initScratch(canvas){
    // définition de l'espace de dessin
    const context =canvas.getContext("2d");
    // application de la taille de l'image au canvas
    canvas.width=canvas.offsetWidth;
    canvas.height=canvas.offsetHeight;
    // couche de grattage ajoutée au-dessus de l'image
    context.globalCompositeOperation = "source-over";
    context.fillStyle="gray";
    context.fillRect(0,0,canvas.width,canvas.height);
    // ajout de la fonction sur la souris pour effacer la zone lorqu'elle est au-dessus de la zone
    canvas.onmousemove = position=>{
        const rect = canvas.getBoundingClientRect();
        // définition de la position de la souris 
        const x = (position.clientX-rect.left)*(canvas.width/rect.width);
        const y = (position.clientY-rect.top)*(canvas.height/rect.height);

        // passage en mode gommage 
        context.globalCompositeOperation="destination-out";

        // definition de la forme pour effacer (un cercle)
        context.beginPath();
        context.arc(x,y,30,0,2*Math.PI);
        context.fill();
    };
}

