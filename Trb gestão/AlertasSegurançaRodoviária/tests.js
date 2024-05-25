/**
 * @jest-environment jsdom
 */

const { checkSpeedAlert, checkBrakeAlert, checkIntersectionAlert, updateSpeed } = require('../public/app');

describe('Alertas de Segurança Rodoviária', () => {
    let originalAlert;

    beforeAll(() => {
        originalAlert = window.alert;
        window.alert = jest.fn();
    });

    afterAll(() => {
        window.alert = originalAlert;
    });

    test('checkSpeedAlert function displays speed alert correctly', () => {
        updateSpeed(50);
        checkSpeedAlert();
        expect(window.alert).toHaveBeenCalledWith('Velocidade dentro do limite.');

        updateSpeed(70);
        checkSpeedAlert();
        expect(window.alert).toHaveBeenCalledWith('Excesso de Velocidade! Limite de 60 km/h.');
    });

    test('checkBrakeAlert function displays brake alert correctly', () => {
        updateSpeed(60);
        updateSpeed(40);
        checkBrakeAlert();
        expect(window.alert).toHaveBeenCalledWith('Frenagem normal.');

        updateSpeed(60);
        updateSpeed(30);
        checkBrakeAlert();
        expect(window.alert).toHaveBeenCalledWith('Frenagem Brusca Detectada!');
    });

    test('checkIntersectionAlert function displays intersection alert correctly', () => {
        checkIntersectionAlert();
        expect(window.alert).toHaveBeenCalledWith('Aproximação de Cruzamento Detectada!');
    });
});
