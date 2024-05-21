/**
 * Script of the bloc creator.
 */

//#region Constants

// Get the canvas
const CANVAS = document.querySelector(".display");
const CTX = CANVAS.getContext("2d");

// Get the spray-wall image
const SPRAY_WALL_IMG = new Image();
SPRAY_WALL_IMG.src = "../img/spray-wall.jpg";

//#endregion

//#region Variables

// Mouse
let mousePosition = {x: 0, y: 0};

//#enregion

// Loop for things that we do and redo
setInterval(() => {
    //#region Responsive

    // Adapt the height of the canvas
    CANVAS.height = window.innerHeight;

    // Draw the image
    if (SPRAY_WALL_IMG.width * (window.innerHeight / SPRAY_WALL_IMG.height) < window.innerWidth) {
        CANVAS.width = SPRAY_WALL_IMG.width * (window.innerHeight / SPRAY_WALL_IMG.height);
        CTX.drawImage(SPRAY_WALL_IMG, 0, 0, SPRAY_WALL_IMG.width * (window.innerHeight / SPRAY_WALL_IMG.height), window.innerHeight);
    } else {
        CANVAS.width = window.innerWidth;
        CTX.drawImage(SPRAY_WALL_IMG, 0, 0, window.innerWidth, SPRAY_WALL_IMG.height * (window.innerWidth / SPRAY_WALL_IMG.width));
    }

    //#endregion


    // Draw the mouse position
    CTX.fillStyle = "red";
    CTX.fillRect(mousePosition.x - 5, mousePosition.y - 5, 10, 10);

});

//#region Inputs

// Event when the mouse is moved
document.addEventListener("mousemove", (e) => {
    // Get the position of the mouse
    mousePosition.x = e.clientX - CANVAS.offsetLeft;
    mousePosition.y = e.clientY;
});

//#endregion

