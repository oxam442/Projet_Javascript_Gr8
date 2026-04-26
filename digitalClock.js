// Adrien CHAMBRIER VITRE

function addSegments(digitId){
    // récupère dans une variable l'élément avec l'id de digitId
    let digit= document.getElementById(digitId);
    // On lui ajoute des enfants avec les classes "segmentN" dans des <div> pour afficher tous les segments
    for (let i=0; i<7; i++){
        // creation <div>
        let segment = document.createElement("div");
        // ajout classe
        segment.className="segment"+i+" segment off";
        // ajout du tag
        digit.appendChild(segment);
    }
}

function updateDigit(digitId, value){
    // liste des valeurs
    let segmentStates = [
        [1, 1, 1, 0, 1, 1, 1],
        [0, 0, 1, 0, 0, 1, 0],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0, 1, 0],
        [1, 1, 0, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1], 
        [1, 0, 1, 0, 0, 1, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 1, 1]
    ];
    // récupère dans une variable l'élément avec l'id de digitId
    let digit = document.getElementById(digitId);
    // variable pour l'état du segment
    let state;
    // ajout à chaque segment l'état à afficher 
    for (let i =0;i<7;i++){
        // savoir l'état du segment
        if (segmentStates[value][i]==1){
            state="";
        } 
        else {
            state=" off";
        }
        // changement effectuer
        digit.children[i].className="segment"+i+" segment" +state;
    }
}
 
// initialise l'heure
function init(){
    addSegments("hours-tens");
    addSegments("hours-units");
    addSegments("minutes-tens");
    addSegments("minutes-units");
}



function main(){
    init();
    //Pour modifier l'heure
    updateDigit("hours-tens", 2);
    updateDigit("hours-units", 3);
    updateDigit("minutes-tens", 5);
    updateDigit("minutes-units", 9);
}
main();
