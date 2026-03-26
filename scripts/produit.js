function ColorButton() {
    let color = `blue`;
    let button=document.getElementById("button");
    button.style.backgroundColor=  color;
}
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