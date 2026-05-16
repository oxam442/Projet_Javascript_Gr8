// base de donnée
const equipe = [
    {id:"acv",nom:"Adrien Chambrier Vitre",fonction:"Co-fondateur & programmeur", adresse:"adrien.chambrier-vitre@isen-ouest.yncrea.fr", description:""},
    {id:"tt",nom:"Thimothé Tran",fonction:"Co-fondateur & designer", adresse:"thimothe.tran@isen-ouest.yncrea.fr", description:""}
]
let isAdmin=false;

function displayCard(){
    let id=document.getElementById("equipe");
    for(let i=0;i<2;i++){
        let content=`            
        <div class="equipe-card" id="${equipe[i].id}" >
                <img src="../images/logo.png" class="img">
                <canvas class="scratch" width="300" height="300"></canvas>
            <div class="equipe-nom" onclick="popupModifName(this)" style="cursor:pointer">${equipe[i].nom}</div>
            <div class="equipe-fonction">${equipe[i].fonction}</div>
            <div class="equipe-mail">${equipe[i].adresse}</div>
            <div>${equipe[i].description}</div>
        </div>
        `;
        id.innerHTML+=content;
    }
}
displayCard();

function popupAddDisplay(){
    let id = document.getElementById("popupAddMember");
    let content=`
        <div class="popup">
            <div id="buttonclose" onclick="modalClose()">X</div>
            <h3>Ajouter un nouveau membre</h3>
            <div>Nom Complet</div>
            <input type="text" placeholder="Prenom Nom" id="newName">
            <div>Rôle</div>
            <input type="text" placeholder="Rôle" id="newRole">
            <div>Email</div>
            <input type="text" placeholder="email@exemple.com" id="newMail">
            <button id="ajouter" onclick="addCard()">ajouter</button>
        </div>`;
    id.innerHTML=content;
    id.style.display="flex";
}

function addCard(){
    let id=document.getElementById("equipe");
    let popup=document.getElementById("popupAddMember");
    document.getElementById("popupAddMember").style.display="none";
    let name = document.getElementById("newName").value;
    let role = document.getElementById("newRole").value;
    let mail = document.getElementById("newMail").value;
    let content=`            
        <div class="equipe-card" id="">
            <div class="scratch">
                <img src="../images/logo.png" width="300" height="300">
                <canvas width="300" height="300"></canvas>
            </div>
            <img src="../images/logo.png" class="img">
            <canvas class="scratch" width="300" height="300"></canvas>
            <div class="equipe-nom" onclick="popupModifName(this)">${name}</div>
            <div class="equipe-fonction">${role}</div>
            <div class="equipe-mail">${mail}</div>
            <button class="buttonSup" onclick="supCard(this)">spprimer</button>
        </div>
        `;
    id.innerHTML+=content;
}

let currentElement = null;
function popupModifName(element){
    currentElement=element;
    let id = document.getElementById("popupModifMember");
    let content=`
        <div class="popup">
            <div id="buttonclose" onclick="modalClose()">X</div>
            <h3>Modification du nom complet</h3>
            <input type="text" placeholder="Prenom Nom" id="nameModif">
            <button id="ajouter" onclick="modifName()">Modifier</button>
        </div>`;
    id.innerHTML=content;
    if (isAdmin){
        id.style.display="flex";
    }
    
}

function modifName(){
    document.getElementById("popupModifMember").style.display="none";
    currentElement.textContent=document.getElementById("nameModif").value;
}

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

function passToAdmin(){
    let userName = prompt("Entrez le nom du profil administrateur :");
    if (userName=="admin"){
        let pwd = prompt("Entrez le mot de passe du profil administrateur :");
        if (pwd=="admin_pwd"){
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

function passToUser(){
    document.getElementById("add-member").style.display="none";
    document.getElementById("edit-mode").style.backgroundColor="var(--secondary-color)";
    isAdmin=false;
}

function supCard(id){
    id.parentElement.remove();
}


// à revoir
const images = [
    "../images/logo.png",
    "../images/logo.png",
    "../images/logo.png"
];

let container = document.getElementById("container");

/* =========================
   1. CREATE BOXES
========================= */
for (let i = 0; i < images.length; i++) {

    let box = document.createElement("div");
    box.className = "scratch";

    let img = document.createElement("img");
    img.src = images[i];
    img.width = 300;
    img.height = 200;

    let canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 200;

    box.appendChild(img);
    box.appendChild(canvas);
    container.appendChild(box);

    /* =========================
       2. SCRATCH INIT
    ========================= */
    let ctx = canvas.getContext("2d");

    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.onmousemove = (e) => {

        ctx.globalCompositeOperation = "destination-out";

        ctx.beginPath();
        ctx.arc(e.offsetX, e.offsetY, 15, 0, Math.PI * 2);
        ctx.fill();
    };
}