// base de donnees
const product =[
    {nom:"service1", categorie:"services", prix:"1", description:"1", nbimg:"2"},
    {nom:"service2", categorie:"services", prix:"1", description:"1", nbimg:"2"},
    {nom:"service3", categorie:"services", prix:"1", description:"1", nbimg:"2"},
    {nom:"pin", categorie:"goodies", prix:"5", nbimg:"4"},
    {nom:"stylo", categorie:"goodies", prix:"2", nbimg:"2"},
    {nom:"portecle", categorie:"goodies", prix:"3", nbimg:"2"},
    {nom:"mug", categorie:"goodies", prix:"8", nbimg:"2"},
    {nom:"tapis", categorie:"goodies", prix:"1000", nbimg:"2"},
    {nom:"trousse", categorie:"goodies", prix:"20", nbimg:"2"},
    {nom:"gourde", categorie:"goodies", prix:"15", nbimg:"2"},
]

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


function popupAchat(){
    let popup=document.getElementById("popupAchat");
    let content=`
            <div class="popup">
            <div id="buttonclose" onclick="modalClose()">X</div>
            <p>Voulez-vous comfirmer votre achat ?</p>
             <button onclick="popupSmiley()">🛒 ACHETER</button>
        </div>`;

    // affiche le popup de confirmation 
    popup.innerHTML=content;
    popup.style.display="flex";
}
 
function popupSmiley(){
    // cache le popup d'achat
    document.getElementById("popupAchat").style.display="none";
    let popup=document.getElementById("popupSmiley");
    // affiche le popup du smiley 
    popup.style.display="flex";
    setTimeout(()=>{
        popup.style.display="none";
    },3000);
}


// filter
function comparePrice(min, max, price){
    if ((Number(price)<=Number(max) && number(price))>=Number(min)||(Number(price)<=Number(max) && min=='')||(max=='' && Number(price)>=Number(min))||(min=='' && max=='')){
        return true;
    }
    else {
        return false;
    }
}

function compareWord(word, product){
    if (word.toLowerCase()==product ||word==''){
        return true;
    }
    else {
        return false;
    } 
}

function compareCategorie(categorie, productCategorie){
    if (categorie==productCategorie || categorie==''){
        return true;
    }
    else {
        return false;
    }
}
function afficherItemFrame(number,id){
    let itemframe = document.getElementById(id);
    let content=`
        <h3>${id.toUpperCase()}</h3>
        <img src="../images/${id}1.png" id="${id}" data-nb="${product[number].nbimg}" onclick="changeImg(this)"></img>
        <div id="prix">${product[number].prix}€</div>
        <button id="button" onclick="popupAchat()" >🛒 ACHETER</button>`;
    itemframe.innerHTML=content;
    itemframe.style.display="flex";

}
function messageError(){
    let popup=document.getElementById("popupError");
    // message d'erreur à modifier
    let content=`       
    <div class="popup">
        <div id="buttonclose" onclick="modalClose()">X</div>
            <p>pas de produit trouvé</p>
    </div>`;
    popup.innerHTML=content;
    popup.style.display="flex";
}
function filter(){
    let cpt=0;
    for (let i=0;i<product.length;i++){
        let element=document.getElementById(product[i].nom);
        if(element){
            element.style.display = "none";
        }   
        document.getElementById("popupError").style.display="none";
        if (comparePrice(document.getElementById("minPrix").value, document.getElementById("maxPrix").value, product[i].prix)==true && 
        compareCategorie(document.getElementById("categorieFilter").value,product[i].categorie)==true && 
        compareWord(document.getElementById("nomFilter").value,product[i].nom)==true){
            afficherItemFrame(i,product[i].nom);
            cpt++;
        }

    }
    if (cpt==0){
        messageError();
    }
}
filter();
