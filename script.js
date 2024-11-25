// get
const buttonPads = document.querySelectorAll(".key");
const audios = document.querySelectorAll(".audio");

// event
document.addEventListener("keyup", playSong);
document.addEventListener("keydown", animationAdd);


// // function
function playSong(event) {
    const letterPress = event.keyCode;
    audios.forEach((element) => {
        if(element.dataset.key == letterPress){
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
}