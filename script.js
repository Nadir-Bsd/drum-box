// get
const buttonPads = document.querySelectorAll(".key");
const audios = document.querySelectorAll(".audio");
var register = [];
var recording = false;
var start;

// event
document.addEventListener("keyup", pressKey);
document.addEventListener("keydown", animationAdd);


// // function
function pressKey(event) {
    const key = event.keyCode;

    if(key == "82"){
        if(recording !== true){
            register = [];
            recording = true;
        }else recording = false;
    };
    
    if(recording === true){
        if(key != "82"){
        
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
        if(element.dataset.key == key){
            element.play();
        };
    });
};

function animationAdd(event) {
    const letterPress = event.keyCode;

    buttonPads.forEach((element) => {
        let buttonPress = element;

        if(buttonPress.dataset.key == letterPress){
            buttonPress.classList.add("playing");
            
            document.addEventListener("keyup", () => {
                buttonPress.classList.remove("playing");            
            });
        };
    });
};

function playSong() {

};