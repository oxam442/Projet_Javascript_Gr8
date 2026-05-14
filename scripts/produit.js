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

// Fonction pour afficher le popup pour acheter
function popupAchat(){
    // récupération id
    let popup=document.getElementById("popupAchat");
    // contenu à afficher 
    let content=`
            <div class="popup">
            <div id="buttonclose" onclick="modalClose()">X</div>
            <p>Voulez-vous comfirmer votre achat ?</p>
             <button onclick="popupSmiley()">🛒 ACHETER</button>
        </div>`;

    // affichage du popup achat
    popup.innerHTML=content;
    popup.style.display="flex";
} 
 
// Fonction pour afficher la confirmation de l'achat
function popupSmiley(){
    // cache le popup d'achat
    document.getElementById("popupAchat").style.display="none";
    // récupération id 
    let popup=document.getElementById("popupSmiley");
    // affichage du popup pour la confirmation de l'achat 
    popup.style.display="flex";
    setTimeout(()=>{
        popup.style.display="none";
    },3000);
}


// filter
// base de donnees
const product =[
    {nom:"Atelier Team bulding", categorie:"services", prix:"900", description:"Séance interactive pour renforcer la cohésion d'équipe. Jeux collaboratifs, ateliers de résolution de problèmes, et débriefing stratégique dans un environnement exterieur.", nbimg:"2"},
    {nom:"Co-Walking Networking", categorie:"services", prix:"900", description:"Organisation de marches en groupe (etudiants, entrepreneurs...) pour étoffer son réseau.", nbimg:"2"},
    {nom:"pin", categorie:"goodies", prix:"5", nbimg:"4", description:" "},
    {nom:"stylo", categorie:"goodies", prix:"2", nbimg:"2", description:" "},
    {nom:"portecle", categorie:"goodies", prix:"3", nbimg:"2", description:" "},
    {nom:"mug", categorie:"goodies", prix:"8", nbimg:"2", description:" "},
    {nom:"tapis", categorie:"goodies", prix:"1000", nbimg:"2", description:" "},
    {nom:"trousse", categorie:"goodies", prix:"20", nbimg:"2", description:" "},
    {nom:"gourde", categorie:"goodies", prix:"15", nbimg:"2", description:" "},
]

// Fonction pour comparer le prix
function comparePrice(min, max, price){
    // Tous les tests possibles sont testés
    if ((Number(price)<=Number(max) && number(price))>=Number(min)||(Number(price)<=Number(max) && min=='')||(max=='' && Number(price)>=Number(min))||(min=='' && max=='')){
        return true;
    }
    else {
        return false;
    }
}

// Fonction pour comparer le nom du produit
function compareWord(word, product){
    // Tous les tests possibles sobt testés
    if (word.toLowerCase()==product ||word==''){
        return true;
    }
    else {
        return false;
    } 
}

// Fonction pour comparer la catégorie
function compareCategorie(categorie, productCategorie){
    // Tous les cas possibles sont testés
    if (categorie==productCategorie || categorie==''){
        return true;
    }
    else {
        return false;
    }
}

// Fonction pour afficher les itemframe
function afficherItemFrame(number,id){
    // récupération id
    let itemframe = document.getElementById(id);
    // contenu à afficher
    let content=`
        <h3>${id.toUpperCase()}</h3>
        <img src="../images/${id}1.png" id="${id}" data-nb="${product[number].nbimg}" onclick="changeImg(this)"></img>
        <div> ${product[number].description}</div>
        <div id="prix">${product[number].prix}€ à l'unité</div>
        <button id="button" onclick="popupAchat()" >🛒 ACHETER</button>`;
    // affichage du contenu
    itemframe.innerHTML=content;
    itemframe.style.display="flex";

}

// Fonction pour afficher le message d'erreur lorsque les filtres ne fonctionnent pas
function messageError(){
    // récupération id
    let popup=document.getElementById("popupError");
    // contenu à afficher
    let content=`       
    <div class="popup">
        <div id="buttonclose" onclick="modalClose()">X</div>
            <p>pas de produit trouvé</p>
    </div>`;
    // affichage du contenu
    popup.innerHTML=content;
    popup.style.display="flex";
}

// Fonction pour appliquer tout les filtres
function filter(){
    let cpt=0;
    for (let i=0;i<product.length;i++){
        let element=document.getElementById(product[i].nom);
        if(element){
            element.style.display = "none";
        }   
        document.getElementById("popupError").style.display="none";
        // utilisation de toutes les fonctions pour savoir quelle itemframe, on affiche
        if (comparePrice(document.getElementById("minPrix").value, document.getElementById("maxPrix").value, product[i].prix)==true && 
        compareCategorie(document.getElementById("categorieFilter").value,product[i].categorie)==true && 
        compareWord(document.getElementById("nomFilter").value,product[i].nom)==true){
            afficherItemFrame(i,product[i].nom);
            cpt++;
        }

    }
    // affichage du message d'erreur s'il n'y a les filtres ne fonctionnent pas
    if (cpt==0){
        messageError();
    }
}
filter();
