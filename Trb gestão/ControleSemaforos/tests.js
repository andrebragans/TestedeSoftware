/**
 * @jest-environment jsdom
 */

const { startTrafficLight, stopTrafficLight, changeLight, currentLight, intervalId } = require('../public/app');

describe('Controle de Semáforo', () => {
    let lights;

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="traffic-light">
                <div class="light red"></div>
                <div class="light yellow"></div>
                <div class="light green"></div>
            </div>
            <button id="startStopButton">Iniciar</button>
        `;
        lights = {
            red: document.querySelector('.light.red'),
            yellow: document.querySelector('.light.yellow'),
            green: document.querySelector('.light.green')
        };
    });

    test('initial light is red', () => {
        expect(currentLight).toBe('red');
        expect(lights.red.classList.contains('active')).toBe(false);
        expect(lights.yellow.classList.contains('active')).toBe(false);
        expect(lights.green.classList.contains('active')).toBe(false);
    });

    test('changeLight function cycles through lights', () => {
        changeLight();
        expect(lights.red.classList.contains('active')).toBe(false);
        expect(lights.green.classList.contains('active')).toBe(true);

        changeLight();
        expect(lights.green.classList.contains('active')).toBe(false);
        expect(lights.yellow.classList.contains('active')).toBe(true);

        changeLight();
        expect(lights.yellow.classList.contains('active')).toBe(false);
        expect(lights.red.classList.contains('active')).toBe(true);
    });

    test('startTrafficLight starts the interval', () => {
        jest.useFakeTimers();
        startTrafficLight();
        expect(setInterval).toHaveBeenCalledTimes(1);
        jest.runOnlyPendingTimers();
        stopTrafficLight();
    });

    test('stopTrafficLight stops the interval', () => {
        jest.useFakeTimers();
        startTrafficLight();
        stopTrafficLight();
        expect(clearInterval).toHaveBeenCalledTimes(1);
    });
});
