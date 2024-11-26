// get
const buttonPads = document.querySelectorAll(".key");
const audios = document.querySelectorAll(".audio");
var register = [];
var recording = false;
var start;

// event
document.addEventListener("keyup", pressKey);
document.addEventListener("keydown", animationAdd);


// // functions
function pressKey(event) {
    const key = String(event.keyCode);

    
    
    buttonPads.forEach((element) => {
        
        if(element.dataset.key === key && key !== "82"){
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

            console.log(register);

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

function playSong() {

};