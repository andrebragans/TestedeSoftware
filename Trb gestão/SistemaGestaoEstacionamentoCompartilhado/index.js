let parkingSpaces = []; // Array para armazenar o estado das vagas de estacionamento

function initializeParkingLot(size) {
    parkingSpaces = new Array(size).fill(false); // Inicializa todas as vagas como não reservadas
}

function reserveParkingSpace() {
    const availableSpaceIndex = parkingSpaces.indexOf(false); // Procura a primeira vaga disponível
    if (availableSpaceIndex !== -1) {
        parkingSpaces[availableSpaceIndex] = true; // Reserva a vaga
        return availableSpaceIndex; // Retorna o índice da vaga reservada
    }
    return -1; // Retorna -1 se não houver vagas disponíveis
}

function releaseParkingSpace(index) {
    if (parkingSpaces[index]) {
        parkingSpaces[index] = false; // Libera a vaga
        return true; // Retorna verdadeiro se a vaga foi liberada com sucesso
    }
    return false; // Retorna falso se a vaga já estiver livre
}

module.exports = { initializeParkingLot, reserveParkingSpace, releaseParkingSpace };
