// get
const buttonPads = document.querySelectorAll(".key");
const audios = document.querySelectorAll(".audio");
var register;
var recording = false;
var start;

// event
document.addEventListener("keyup", pressKey);
document.addEventListener("keydown", animationAdd);


// // functions
function pressKey(event) {
    const key = String(event.keyCode);
    
    buttonPads.forEach((element) => {
        if(element.dataset.key === key && key !== "82" && key !== "80"){
            element.classList.toggle("playing");
        };
    });

    if(key === "82"){
        if(recording !== true){
            register = [];
            start = Date.now();
            recording = true;
        }else recording = false;
    };
    
    if(recording === true){
        if(key !== "82"){
            if (!start){
                start = Date.now();
            };

            if (Date.now === start){
                register.push({"key": key, "time": 0});
            }else register.push({"key": key, "time": (Date.now() - start)});
        };
    };

    if(key === "80"){
        if(register){
            playSong(register);
        }else{console.log(("aucun son enregistré"));}
    };

    // pour chaque audios, if l'audio = key qui est press alors play sound 
    audios.forEach((element) => {
        if(element.dataset.key === key){
            element.play();
        };
    });
};


// add animation 
function animationAdd(event) {
    const letterPress = String(event.keyCode);
    
    buttonPads.forEach((element) => {
        
        if(element.dataset.key === letterPress){
            element.classList.toggle("playing");
        };
    });
};

function playSong(notes) {

    // foreach notes
    notes.forEach((note) => {
        // c'est la note qui est play
        let noteWhoIsPlay = note.key;
        // c'est le time de la note
        let timeNoteIsPlay = note.time;
        // c'est le time de la note plus time de l'anime 
        let timeAnimationIsPlay = 180 + timeNoteIsPlay;

        // cree une promesse
        return new Promise(
            // fait les timeOut
            (resolve, reject) => {
                // note timeOut
                setTimeout(() => {

                    const eventDown = new KeyboardEvent("keydown", {'keyCode': noteWhoIsPlay});
                    document.dispatchEvent(eventDown);
                    // joue les notes
                    document.querySelector(`.audio[data-key='${noteWhoIsPlay}']`).play();
                    
                }, timeNoteIsPlay);  

                setTimeout(() => {
                    // cree un event
                    const eventUp = new KeyboardEvent("keyup", {'keyCode':noteWhoIsPlay});
                    // joue l'anime
                    document.dispatchEvent(eventUp);
                }, timeAnimationIsPlay);

            }
        ); 
    });

};

playSong().then((res) => {console.log(res)}).catch((resErreur) => {console.log(resErreur)});