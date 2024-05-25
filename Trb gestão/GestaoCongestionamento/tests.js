/**
 * @jest-environment jsdom
 */

const { startSimulation, stopSimulation, moveVehicles, checkCongestion } = require('../public/app');

describe('Gestão de Congestionamento', () => {
    let vehicle1, vehicle2;

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="road" id="road">
                <div class="vehicle" id="vehicle1" style="left: 0;"></div>
                <div class="vehicle" id="vehicle2" style="left: 100px;"></div>
            </div>
        `;
        vehicle1 = document.getElementById('vehicle1');
        vehicle2 = document.getElementById('vehicle2');
    });

    test('moveVehicles function moves the vehicles', () => {
        moveVehicles();
        expect(vehicle1.style.left).toBe('2px');
        expect(vehicle2.style.left).toBe('103px');
    });

    test('checkCongestion function detects congestion', () => {
        vehicle1.style.left = '0px';
        vehicle2.style.left = '5px';
        expect(checkCongestion()).toBe(true);
    });

    test('checkCongestion function does not detect congestion when vehicles are far apart', () => {
        vehicle1.style.left = '0px';
        vehicle2.style.left = '100px';
        expect(checkCongestion()).toBe(false);
    });

    test('startSimulation starts the movement', () => {
        jest.useFakeTimers();
        startSimulation();
        expect(setInterval).toHaveBeenCalledTimes(1);
        jest.runOnlyPendingTimers();
        expect(vehicle1.style.left).toBe('2px');
        expect(vehicle2.style.left).toBe('103px');
        stopSimulation();
    });

    test('stopSimulation stops the movement', () => {
        jest.useFakeTimers();
        startSimulation();
        stopSimulation();
        const intervalIdBefore = setInterval.mock.calls.length;
        jest.runOnlyPendingTimers();
        expect(setInterval.mock.calls.length).toBe(intervalIdBefore);
    });
});
