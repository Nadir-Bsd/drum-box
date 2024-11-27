// get
const buttonPads = document.querySelectorAll(".key");
const audios = document.querySelectorAll(".audio");
var recording = false;
var playing = false;
var register;
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

    if(key === "80"){
        if(register && playing !== true){
            playSong(register);
            playing = true;
        }else if (playing === true){
            
            // element a supp
            const playButton = document.querySelector(`.key[data-key='${key}']`);
            // on veux supp l'anime
            playButton.classList.toggle("playing");
            // playing devient false
            playing = false;

        }else{
            console.log(("aucun son enregistré"));
            const playButton = document.querySelector(`.key[data-key='${key}']`);
            playButton.classList.toggle("playing");
        };
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

// play the song
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
                    const eventUp = new KeyboardEvent("keyup", {'keyCode': noteWhoIsPlay});
                    // declenche l'event
                    document.dispatchEvent(eventUp);

                    if(notes[notes.length - 1] === note){
                        // cree un event
                        const eventUp = new KeyboardEvent("keyup", {'keyCode': 80});
                        // declenche l'event
                        document.dispatchEvent(eventUp)
                    };

                }, timeAnimationIsPlay);

            }
        );
    });
};