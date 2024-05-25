const registeredVehicles = new Set();
const tollLog = [];

document.getElementById('registerButton').addEventListener('click', () => {
    const vehicleId = document.getElementById('vehicleId').value;
    if (vehicleId && !registeredVehicles.has(vehicleId)) {
        registeredVehicles.add(vehicleId);
        alert(`Veículo ${vehicleId} registrado com sucesso!`);
        document.getElementById('vehicleId').value = '';
    } else {
        alert('Veículo já registrado ou ID inválido.');
    }
});

document.getElementById('passButton').addEventListener('click', () => {
    const vehicleId = document.getElementById('passVehicleId').value;
    if (registeredVehicles.has(vehicleId)) {
        const tollAmount = calculateToll();
        tollLog.push({ vehicleId, tollAmount, time: new Date() });
        updateLog();
        alert(`Veículo ${vehicleId} passou pelo pedágio. Valor: R$${tollAmount}`);
        document.getElementById('passVehicleId').value = '';
    } else {
        alert('Veículo não registrado.');
    }
});

function calculateToll() {
    return 5.00;  // Valor fixo de pedágio
}

function updateLog() {
    const logList = document.getElementById('logList');
    logList.innerHTML = '';
    tollLog.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `Veículo: ${entry.vehicleId}, Valor: R$${entry.tollAmount}, Hora: ${entry.time}`;
        logList.appendChild(listItem);
    });
}

module.exports = { registeredVehicles, tollLog, calculateToll };
