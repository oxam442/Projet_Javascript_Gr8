
function changeImg(){
    let img= document.getElementById("img1");
    let src = img.src; 
    if (src.includes("pin1.png")){
        img.src="../images/pin2.png";
    }
    else if (src.includes("pin2.png")){
        img.src="../images/pin3.png";
    }
    else if (src.includes("pin3.png")){
        img.src="../images/pin4.png";
    }
    else{
        img.src="../images/pin1.png";
    }
}

function achat(){
    let largeur = 600;
    let hauteur = 400;

    let left = (window.screen.width - largeur) / 2;
    let top = (window.screen.height - hauteur) / 2;

    window.open(
        "acheter.html",
        "popup",
        `width=${largeur},height=${hauteur},left=${left},top=${top}`
    );
}
 