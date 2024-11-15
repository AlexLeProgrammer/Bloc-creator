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
SPRAY_WALL_IMG.onload = () => {
    // Set the size of the canvas
    CANVAS.width = SPRAY_WALL_IMG.width;
    CANVAS.height = SPRAY_WALL_IMG.height;
}

// Color palette
const COLOR_START = "#3ae100";
const COLOR_TOP = "#df39e3";
const COLOR_HOLD = "#15b3a9";
const COLOR_FOOT = "#ffe500";
const COLOR_HAND = "#ef0000";

// Holds
const HOLD_RADIUS = 200;

//#endregion

//#region Variables

// Mouse
let mousePosition = {x: 0, y: 0};

// Data of the boulder
let boulderData = [];
let selectedColor = document.querySelector(".selected > div").style.backgroundColor;

//#enregion

// Loop for things that we do and redo
setInterval(() => {
    // Clear the canvas
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

    // Set the active color
    selectedColor = document.querySelector(".selected > div").style.backgroundColor;

    // Draw the holds
    CTX.lineWidth = 2 * (CANVAS.width / CANVAS.getBoundingClientRect().width);
    for (const HOLD of boulderData) {
        CTX.strokeStyle = HOLD.color;
        CTX.beginPath();
        CTX.arc(HOLD.x, HOLD.y, HOLD_RADIUS * (window.innerWidth / SPRAY_WALL_IMG.width), 0, 2 * Math.PI);
        CTX.closePath();
        CTX.stroke();
    }

    // Draw the mouse position
    CTX.fillStyle = "red";
    CTX.fillRect(mousePosition.x - 40, mousePosition.y - 40, 80, 90);

});

//#region Inputs

// Event when the mouse is moved
document.addEventListener("mousemove", (e) => {
    // Get the position of the mouse
    mousePosition.x = e.clientX * (CANVAS.width / CANVAS.getBoundingClientRect().width) - CANVAS.offsetLeft * (CANVAS.width / CANVAS.getBoundingClientRect().width);
    mousePosition.y = e.clientY * (CANVAS.height / CANVAS.getBoundingClientRect().height) + scrollY * 2;
});

// Add holds
document.addEventListener("mousedown", () => {
    boulderData.push({color:selectedColor, x:mousePosition.x, y:mousePosition.y});
});

//#endregion

