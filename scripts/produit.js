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


// filter

// base de donnée avec const à faire
const product=[];
function comparePrice(min, max, price){
    if ((price<=max && price>=min)||(price<=max && min=='')||(max=='' && price>=min)||(min=='' && max=='')){
        return true;
    }
    else {
        return false;
    }
}
function compareWord(word, product){
    if (word==product ||word==''){
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

function filter(){
    let cpt=0;
    for (let i=0;i<product.length;i++){
        if (comparePrice()==true && compareCategorie()==true && compareWord()==true){
            // display
            cpt++;
        }
        else {
            // non display
        }
    }
    if (cpt==0){
        // display message erreur
    }
}