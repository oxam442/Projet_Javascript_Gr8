function addSegments(digitId){
    //  Get the right div
    let digit = document.querySelector(`#${digitId}`)
    for (let i = 0 ; i < 7; ++i ){
        // Creates a div
        const segment = document.createElement("div");
        // Add the classes names
        segment.classList += "segment";
        segment.classList += ` segment${i}`;
        segment.classList +=  " off";
        // Appends the div
        digit.appendChild(segment);
    }
}

function updateDigit(digitId, value){
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
    // get the segments from the digit div
    let digit = document.querySelector(`#${digitId}`)
    let segments = digit.querySelectorAll(".segment")
    // for each segments
    for (let i = 0 ; i < 7 ; ++i){
        // if the states of the segment is on remove "off"
        if (segmentStates[value][i]==1){
            segments[i].classList.remove("off");
        }
        // Add "off"
        else {
            segments[i].classList.add("off");
        }
    } 
}

function init(){
    // Add the segments on each digits
    addSegments("hours-tens");
    addSegments("hours-units");
    addSegments("minutes-tens");
    addSegments("minutes-units");
}

function setTime(){
    // Get the time
    const time = new Date();
    // Get the hours
    const hours = time.toLocaleTimeString('fr-FR').split(":")[0]
    // Get the minutes
    const minutes = time.toLocaleTimeString('fr-FR').split(":")[1]
    // Get the tens and the units to set the right value on each digit
    updateDigit("hours-tens",hours.split("")[0])
    updateDigit("hours-units",hours.split("")[1])
    updateDigit("minutes-tens",minutes.split("")[0])
    updateDigit("minutes-units",minutes.split("")[1])
    
}

function main(){
    init();
    // The time for the 1st time
    setTime()
    // Every minutes updates the time
    setInterval(()=>setTime(),1000)
}
main();
