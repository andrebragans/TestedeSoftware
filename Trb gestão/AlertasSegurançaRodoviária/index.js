let speed = 0;
let lastSpeed = 0;

const speedAlertButton = document.getElementById('speedAlertButton');
const brakeAlertButton = document.getElementById('brakeAlertButton');
const intersectionAlertButton = document.getElementById('intersectionAlertButton');

speedAlertButton.addEventListener('click', () => {
    checkSpeedAlert();
});

brakeAlertButton.addEventListener('click', () => {
    checkBrakeAlert();
});

intersectionAlertButton.addEventListener('click', () => {
    checkIntersectionAlert();
});

function checkSpeedAlert() {
    if (speed > 60) {
        alert('Excesso de Velocidade! Limite de 60 km/h.');
    } else {
        alert('Velocidade dentro do limite.');
    }
}

function checkBrakeAlert() {
    if (lastSpeed - speed > 20) {
        alert('Frenagem Brusca Detectada!');
    } else {
        alert('Frenagem normal.');
    }
}

function checkIntersectionAlert() {
    // Lógica para verificar a aproximação de um cruzamento
    alert('Aproximação de Cruzamento Detectada!');
}

// Simulação de alteração na velocidade (para fins de teste)
function updateSpeed(newSpeed) {
    lastSpeed = speed;
    speed = newSpeed;
}
