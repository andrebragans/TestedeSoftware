/**
 * @jest-environment jsdom
 */

const { initializeParkingLot, reserveParkingSpace, releaseParkingSpace } = require('../public/app');

describe('Gestão de Estacionamento Compartilhado', () => {
    beforeEach(() => {
        initializeParkingLot(5); // Inicializa 5 vagas de estacionamento
    });

    test('reserveParkingSpace reserves a parking space', () => {
        const index = reserveParkingSpace();
        expect(index).toBe(0);
    });

    test('releaseParkingSpace releases a parking space', () => {
        reserveParkingSpace();
        const released = releaseParkingSpace(0);
        expect(released).toBe(true);
    });

    test('reserveParkingSpace returns -1 if no parking space is available', () => {
        initializeParkingLot(1); // Apenas uma vaga disponível
        reserveParkingSpace(); // Reservar a única vaga disponível
        const index = reserveParkingSpace(); // Tentar reservar outra vaga
        expect(index).toBe(-1); // Deve retornar -1, indicando que não há vagas disponíveis
    });

    test('releaseParkingSpace returns false if the space is already released', () => {
        const released = releaseParkingSpace(0); // Tentar liberar uma vaga que já está livre
        expect(released).toBe(false); // Deve retornar false, indicando que a vaga já estava livre
    });
});
