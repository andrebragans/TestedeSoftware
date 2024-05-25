/**
 * @jest-environment jsdom
 */

const { registeredVehicles, tollLog, calculateToll } = require('../public/app');

describe('Controle de Pedágio Eletrônico', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <h1>Controle de Pedágio Eletrônico</h1>
            <div id="register">
                <h2>Registrar Veículo</h2>
                <input type="text" id="vehicleId" placeholder="ID do Veículo">
                <button id="registerButton">Registrar</button>
            </div>
            <div id="toll">
                <h2>Passar pelo Pedágio</h2>
                <input type="text" id="passVehicleId" placeholder="ID do Veículo">
                <button id="passButton">Passar</button>
            </div>
            <div id="log">
                <h2>Log de Pedágio</h2>
                <ul id="logList"></ul>
            </div>
        `;
    });

    test('should register a new vehicle', () => {
        const vehicleIdInput = document.getElementById('vehicleId');
        const registerButton = document.getElementById('registerButton');

        vehicleIdInput.value = 'ABC1234';
        registerButton.click();

        expect(registeredVehicles.has('ABC1234')).toBe(true);
    });

    test('should not register an already registered vehicle', () => {
        registeredVehicles.add('ABC1234');
        const vehicleIdInput = document.getElementById('vehicleId');
        const registerButton = document.getElementById('registerButton');

        vehicleIdInput.value = 'ABC1234';
        registerButton.click();

        expect(registeredVehicles.size).toBe(1);
    });

    test('should calculate toll amount correctly', () => {
        const tollAmount = calculateToll();
        expect(tollAmount).toBe(5.00);
    });

    test('should process vehicle passing through the toll', () => {
        registeredVehicles.add('ABC1234');
        const passVehicleIdInput = document.getElementById('passVehicleId');
        const passButton = document.getElementById('passButton');

        passVehicleIdInput.value = 'ABC1234';
        passButton.click();

        expect(tollLog.length).toBe(1);
        expect(tollLog[0].vehicleId).toBe('ABC1234');
        expect(tollLog[0].tollAmount).toBe(5.00);
    });

    test('should not process unregistered vehicle passing through the toll', () => {
        const passVehicleIdInput = document.getElementById('passVehicleId');
        const passButton = document.getElementById('passButton');

        passVehicleIdInput.value = 'XYZ5678';
        passButton.click();

        expect(tollLog.length).toBe(0);
    });
});
