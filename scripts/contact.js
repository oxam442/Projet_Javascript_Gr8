function azerty(){
    let thon = document.getElementById("nomContact");
    let bar=thon.value.trim().split(" ");
    if (bar.length>=2 && bar[0]!="" && bar[1]!=""){
        document.getElementById("nomRule").style.display="none";
        thon.style.border="2px solid green";
        return true;
    }
    else if(bar[0]!=""){
        document.getElementById("nomRule").style.display="flex";
        thon.style.border="2px solid red";
        return false;
    }
        else{
        document.getElementById("nomRule").style.display="none";
        return false;
    }
}

function qwerty(){
    let thon = document.getElementById("mailContact");
    let bar=thon.value.trim().split("@");
    if (thon.value.includes("@") && bar[1].includes(".")){   
        document.getElementById("mailRule").style.display="none";
        thon.style.border="2px solid green";
        return true;
    }
    else if(bar[0]==""){
        document.getElementById("mailRule").style.display="none";
        return false;
    }
    else{

        document.getElementById("mailRule").style.display="flex";
        thon.style.border="2px solid red";
        return false;
    }
}

function zqsd(){
    let thon = document.getElementById("messageContact");
    if (thon.value.length>19 && thon.value.length<1000){  
        document.getElementById("messageRule").style.display="none";
        thon.style.border="2px solid green";
        return true;
    }
    else if(thon.value==""){
        document.getElementById("messageRule").style.display="none";
        return false;
    }
    else {
        document.getElementById("messageRule").style.display="flex";
        thon.style.border="2px solid red";
        return false;
    }
}

function verif(){
    if (zqsd()==true && azerty()==true && qwerty()==true){ 
        document.getElementById("submitButton").style.background="var(--primary-color)";  
        document.getElementById("submitButton").disabled=false;
    }
    else{
        document.getElementById("submitButton").style.background="var(--secondary-color)";
        document.getElementById("submitButton").disabled=true;
    } 
} 

// Jeu
let cpt=0;
function clickJeu(){
    cpt++;
}
function jeu(event){
    event.preventDefault();
    let thon=document.getElementById("jeu").style.display="flex";
    let bar=document.getElementById("jeuButton");
    cpt=0;
    let timeLeft=10;
    bar.disabled=false;
    bar.addEventListener("click", clickJeu);
    // partie affichage à ajouter 
    let time = setInterval(() => {
        timeLeft--;
        // partie affichage à ajouter
        if (timeLeft<=0){
            bar.disabled=true; 
            bar.removeEventListener("click",clickJeu);
            clearInterval(time);
            let cps= cpt/10;
            // partie affichage à ajouter
            if(cps>8){
                document.getElementById("jeu").style.display="none";
                document.getElementById("win").style.display="flex";
                setTimeout(()=>{
                    window.location.href="../html/contact.html";
                },3000);
                
            }
            else{
                document.getElementById("jeu").style.display="none";

                document.getElementById("loose").style.display="flex";
                setTimeout(()=>{
                    window.location.href="../html/contact.html";
                },3000);
            }
        }
    }, 1000);
}
 
