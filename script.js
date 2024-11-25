// get
const buttonPads = document.querySelectorAll(".key");
const audios = document.querySelectorAll(".audio");
var register = [];
var recording = false;

// event
document.addEventListener("keyup", pressKey);
document.addEventListener("keydown", animationAdd);


// // function
function pressKey(event) {
    const key = event.keyCode;
    
    if(key == "82"){
        if(recording === true){
            recording = false;
            register = [];
        };
        recording = true;
    };

    if(recording === true){
        if(key != "82"){
            register.push({"key": key});
        };
    };

    console.log(register);

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