
function changeImg(){
    let img= document.getElementById("img1");
    let src = img.src; 
    if (src.includes("logo.png")){
        img.src="../pins1.png";
    }
    else{
        img.src="../logo.png";
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
 