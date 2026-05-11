function write(){
    let thon =document.getElementById("slogan");
    let cpt=0;
    let sloganText= 'Talk Walk Rwar';
    let text= sloganText.split(' ');
    let time = setInterval(()=> {
        if (cpt<3){
            thon.textContent+=text[cpt];
            thon.textContent+=' ';
            cpt++;
        }
        else {
            clearInterval(time);
            animation();
        }
    }, 1000);
}
function animation(){
    let thon =document.getElementById("slogan");
    let cpt=0;
    let taille=[100, -100,0];
    let time = setInterval(()=> {
        if (cpt<3){
            thon.style.transform=`translateX(${taille[cpt++]}px)`;
        }
        else {
            clearInterval(time);
            thon.textContent='';
            write();
        }
    }, 1500);
}
write();
