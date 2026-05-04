function azerty(){
    let thon = document.getElementById("nomContact");
    let bar=thon.value.trim().split(" ");
    if (bar.length>=2 && bar[0]!="" && bar[1]!=""){
        document.getElementById("nomRule").style.display="none";
        thon.style.border="2px solid green";
        cpt++;
    }
    else if(bar[0]!=""){
        document.getElementById("nomRule").style.display="flex";
        thon.style.border="2px solid red";
        cpt=0;
    }
        else{
        document.getElementById("nomRule").style.display="none";
        cpt=0;
    }
}

function qwerty(){
    let thon = document.getElementById("mailContact");
    let bar=thon.value.trim().split("@");
    if (thon.value.includes("@") && bar[1].includes(".")){   
        document.getElementById("mailRule").style.display="none";
        thon.style.border="2px solid green";
        cpt++;
    }
    else if(bar[0]==""){
        document.getElementById("mailRule").style.display="none";
        cpt=0;
    }
    else{

        document.getElementById("mailRule").style.display="flex";
        thon.style.border="2px solid red";
        cpt=0;
    }
}

let cpt=null;
function zqsd(){
    let thon = document.getElementById("messageContact");
    if (thon.value.length>20 && thon.value.length<1000){  
        document.getElementById("messageRule").style.display="none";
        thon.style.border="2px solid green";
        cpt++;
    }
    else if(thon.value==""){
        document.getElementById("messageRule").style.display="none";
        cpt=0;
    }
    else {
        document.getElementById("messageRule").style.display="flex";
        thon.style.border="2px solid red";
        cpt=0;
    }
}

function verif(){
    if (cpt==3){
        document.getElementById("submitButton").style.display="flex";
    }
    else{
        document.getElementById("submitButton").style.display="none";
    }
}
    
