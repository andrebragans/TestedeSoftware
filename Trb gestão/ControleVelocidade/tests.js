/**
 * @jest-environment jsdom
 */

const { startMoving, stopMoving, moveObject, isMoving, speed, intervalId } = require('../public/app');

describe('Controle de Velocidade', () => {
    let object;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="object" style="width: 50px; height: 50px; background-color: blue; position: absolute; top: 100px; left: 0;"></div>
            <div id="controls">
                <button id="startStopButton">Iniciar</button>
                <input type="range" id="speedControl" min="1" max="10" value="5">
                <label for="speedControl">Velocidade</label>
            </div>
        `;
        object = document.getElementById('object');
    });

    test('moveObject function moves the object to the right', () => {
        moveObject();
        expect(object.style.left).toBe('10px');
        moveObject();
        expect(object.style.left).toBe('20px');
    });

    test('startMoving starts the movement', () => {
        jest.useFakeTimers();
        startMoving();
        expect(setInterval).toHaveBeenCalledTimes(1);
        jest.runOnlyPendingTimers();
        expect(object.style.left).toBe('10px');
        stopMoving();
    });

    test('stopMoving stops the movement', () => {
        jest.useFakeTimers();
        startMoving();
        stopMoving();
        const intervalIdBefore = intervalId;
        jest.runOnlyPendingTimers();
        expect(intervalId).toBe(intervalIdBefore);
    });

    test('clicking startStopButton toggles the movement', () => {
        const startStopButton = document.getElementById('startStopButton');
        startStopButton.click();
        expect(isMoving).toBe(true);
        startStopButton.click();
        expect(isMoving).toBe(false);
    });

    test('adjusting speedControl changes the speed', () => {
        const speedControl = document.getElementById('speedControl');
        speedControl.value = 7;
        speedControl.dispatchEvent(new Event('input'));
        expect(speed).toBe(7);
    });
});
