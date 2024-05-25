// app.js

let isMoving = false;
let speed = 5;
let intervalId;
const object = document.getElementById('object');
const startStopButton = document.getElementById('startStopButton');
const speedControl = document.getElementById('speedControl');

startStopButton.addEventListener('click', () => {
    isMoving = !isMoving;
    if (isMoving) {
        startStopButton.textContent = 'Parar';
        startMoving();
    } else {
        startStopButton.textContent = 'Iniciar';
        stopMoving();
    }
});

speedControl.addEventListener('input', (event) => {
    speed = event.target.value;
    if (isMoving) {
        stopMoving();
        startMoving();
    }
});

function startMoving() {
    intervalId = setInterval(moveObject, 1000 / speed);
}

function stopMoving() {
    clearInterval(intervalId);
}

function moveObject() {
    const currentLeft = parseInt(window.getComputedStyle(object).left, 10);
    object.style.left = `${currentLeft + 10}px`;
}
