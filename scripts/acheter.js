function ColorButton() {
    let color = `blue`;
    let button=document.getElementById("button");
    button.style.backgroundColor=  color;
} 


// fonction pour afficher le dessin
function canvasApp(){
    // création de la grille 
    let canvas =document.getElementById("demo");
    let context =canvas.getContext("2d");
    

    // tete (cercle jaune)
    context.beginPath(); 

    // Définition du style
    context.fillStyle="yellow";
    context.strokeStyle="black";
    context.lineWidth=3;

    // Dessin du cercle
    context.arc(100, 100, 75, 0,2*Math.PI);
    context.closePath(); 
    context.stroke();
    context.fill();


    // oeil gauche (cercle noir)
    context.beginPath(); 

    // Définition du style
    context.fillStyle="black";

    // Dessin du cercle
    context.arc(65, 70, 10, 0,2*Math.PI);
    context.closePath(); 
    context.fill();


    // oeil droit (cercle noir)
    context.beginPath(); 

    // Définition du style
    context.fillStyle="black";

    // Dessin du cercle
    context.arc(135, 70, 10, 0,2*Math.PI);
    context.closePath(); 
    context.fill();


    // bouche (arc de cercle noir)
    context.beginPath(); 

    // Définition du style
    context.strokeStyle="black";
    context.lineWidth=6;

    // Dessin de l'arc de cercle
    context.arc(99, 120, 35, 0,Math.PI);
    context.stroke();


    // texte
    // Définition du style
    context.font="sans serif 20px";

    // ajout du text en dessous
    context.fillText("Vous avez acheté ce produit",35,200);
    canvas.style.backgroundColor=style="blue";
}