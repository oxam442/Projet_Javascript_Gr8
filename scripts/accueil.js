// function pour afficher le slogan mot par mot
function write(){
    // recuperation id
    let sloganId =document.getElementById("slogan").children[0];
    // définition des variables 
    let cpt=0;
    let sloganText= 'Talk Walk Rwar';
    let text= sloganText.split(' ');
    //  affichage mot par mot du slogan
    let time = setInterval(()=> {
        if (cpt<3){
            sloganId.textContent+=text[cpt];
            sloganId.textContent+=' ';
            cpt++;
        }
        else {
            // appel la fonction pour animer le slogan
            clearInterval(time);
            animation();
        }
    }, 1000);
}
// function pour animer le slogan
function animation(){
    // recuperation id
    let sloganId =document.getElementById("slogan").children[0];
    // définition des variables 
    let cpt=0;
    let taille=[100, -100,0]; // position pour faire bouger le slogan
    // déplace le slogan de droite à gauche
    let time = setInterval(()=> {
        if (cpt<3){
            sloganId.style.transform=`translateX(${taille[cpt++]}px)`;
        }
        else {
            clearInterval(time);
            sloganId.textContent='';
            // appel la fonction pour afficher le slogan 
            write();
        }
    }, 1500);
} 
write();
