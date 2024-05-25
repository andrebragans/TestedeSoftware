let currentLight = 'red';
let intervalId;

const lights = {
    red: document.querySelector('.light.red'),
    yellow: document.querySelector('.light.yellow'),
    green: document.querySelector('.light.green')
};

const startStopButton = document.getElementById('startStopButton');
startStopButton.addEventListener('click', () => {
    if (intervalId) {
        stopTrafficLight();
    } else {
        startTrafficLight();
    }
});

function startTrafficLight() {
    intervalId = setInterval(changeLight, 1000);
    startStopButton.textContent = 'Parar';
}

function stopTrafficLight() {
    clearInterval(intervalId);
    intervalId = null;
    startStopButton.textContent = 'Iniciar';
}

function changeLight() {
    switch (currentLight) {
        case 'red':
            lights.red.classList.remove('active');
            lights.green.classList.add('active');
            currentLight = 'green';
            break;
        case 'green':
            lights.green.classList.remove('active');
            lights.yellow.classList.add('active');
            currentLight = 'yellow';
            break;
        case 'yellow':
            lights.yellow.classList.remove('active');
            lights.red.classList.add('active');
            currentLight = 'red';
            break;
    }
}

module.exports = { startTrafficLight, stopTrafficLight, changeLight, currentLight, intervalId };
