// Fonction pour verifier le nom prénom et nom
function nomVerif(){
    // reucperation id 
    let id = document.getElementById("nomContact");
    // on split pour avoir un tableau
    let value=id.value.trim().split(" ");
    // test pour savoir si l'entrée est vérifiée
    if (value.length>=2 && value[0]!="" && value[1]!=""){
        document.getElementById("nomRule").style.display="none";
        id.style.border="2px solid green";
        return true;
    }
    // cas où il n'y a rien d'entrée
    else if(value[0]==""){
        document.getElementById("nomRule").style.display="none";
        return false;
    }
    // cas où il y a une erreur
    else{
        id.style.border="2px solid red";
        document.getElementById("nomRule").style.display="flex";
        return false;
    }
}

// Fonction pour verifier l'adresse mail
function mailVerif(){
    // reucperation id
    let id = document.getElementById("mailContact");
    // on split pour avoir un tableau
    let value=id.value.trim().split("@");
    // test pour savoir si l'entrée est vérifiée
    if (id.value.includes("@") && value[1].includes(".")){   
        document.getElementById("mailRule").style.display="none";
        id.style.border="2px solid green";
        return true;
    }
    // cas où il n'y a rien d'entrée
    else if (value[0]==""){
        document.getElementById("mailRule").style.display="none";
        return false;
    }
    // cas où il y a une erreur
    else{
        document.getElementById("mailRule").style.display="flex";
        id.style.border="2px solid red";
        return false;
    }
}

// Fonction pour verifier le message à envoyer
function messageVerif(){
    // reucperation id
    let id = document.getElementById("messageContact");
    // test pour savoir si l'entrée est vérifiée
    if (id.value.length>19 && id.value.length<1000){  
        document.getElementById("messageRule").style.display="none";
        id.style.border="2px solid green";
        return true;
    }
    // cas où il n'y a rien d'entrée
    else if(id.value==""){
        document.getElementById("messageRule").style.display="none";
        return false;
    }
    // cas où il y a une erreur
    else {
        document.getElementById("messageRule").style.display="flex";
        id.style.border="2px solid red";
        return false;
    }
}

// Fonction pour verifier les 3 conditions et débloquer le bouton
function verifTotal(){
    if (nomVerif()==true && mailVerif()==true && messageVerif()==true){ 
        document.getElementById("submitButton").style.background="var(--primary-color)";  
        document.getElementById("submitButton").disabled=false;
    }
    else{
        document.getElementById("submitButton").style.background="var(--secondary-color)";
        document.getElementById("submitButton").disabled=true;
    } 
} 


// Jeu
// compteur
let cpt=0;
// Fonction pour ajouter un click au compteur
function clickJeu(){
    cpt++;
}

// Jeu
function jeu(event){
    // rester sur la meme page
    event.preventDefault();
    // recuperation id
    let button=document.getElementById("jeuButton");
    let id = document.getElementById("popupJeu");
    id.style.display="flex";
    // définition variable
    cpt=0;
    let timeLeft=10;
    let cps=0;
    // ajout de la fonction pour cliquer et débloque le bouton
    button.disabled=false;
    button.addEventListener("click", clickJeu);
    // affichage du temps et du nombre de click
    id.children[0].children[0].textContent=`Il reste ${timeLeft}s à jouer`;
    id.children[0].children[1].textContent=`nombre de click : ${cpt}`;
    // boucle du jeu
    let time = setInterval(() => {
        // enlève le temps
        timeLeft--;
        // affichage du temps et du nombre de click
        id.children[0].children[0].textContent=`Il reste ${timeLeft}s à jouer`;
        id.children[0].children[1].textContent=`nombre de click : ${cpt}`;
        if (timeLeft<=0){
            // enlève la fonction pour cliquer et bloque le bouton
            button.disabled=true; 
            button.removeEventListener("click",clickJeu);
            clearInterval(time);
            cps= cpt/10;
            // affiche le nombre de click par seconde dans la console 
            console.log(cps);
            // afficher le message gagné si la condition est vérifié soit un cps de 8
            if(cps>8){
                document.getElementById("popupJeu").style.display="none";
                document.getElementById("popupWin").style.display="flex";
                setTimeout(()=>{
                    window.location.href="../html/contact.html";
                },3000);      
            }
            // afficher le message perdu si la condition n'est pas vérifié
            else{
                document.getElementById("popupJeu").style.display="none";
                document.getElementById("popupLoose").style.display="flex";
                setTimeout(()=>{
                    window.location.href="../html/contact.html";
                },3000);
            }   
        }
    }, 1000);
}
 
