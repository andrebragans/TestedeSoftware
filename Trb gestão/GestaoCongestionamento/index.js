let intervalId;
const vehicles = [
    { id: 'vehicle1', element: document.getElementById('vehicle1'), speed: 2, position: 0 },
    { id: 'vehicle2', element: document.getElementById('vehicle2'), speed: 3, position: 100 }
];

function startSimulation() {
    intervalId = setInterval(moveVehicles, 100);
}

function stopSimulation() {
    clearInterval(intervalId);
}

function moveVehicles() {
    vehicles.forEach(vehicle => {
        vehicle.position += vehicle.speed;
        vehicle.element.style.left = `${vehicle.position}px`;
    });
    checkCongestion();
}

function checkCongestion() {
    for (let i = 0; i < vehicles.length - 1; i++) {
        for (let j = i + 1; j < vehicles.length; j++) {
            if (Math.abs(vehicles[i].position - vehicles[j].position) < 10) {
                console.log(`Congestion detected between ${vehicles[i].id} and ${vehicles[j].id}`);
                return true;
            }
        }
    }
    return false;
}

module.exports = { startSimulation, stopSimulation, moveVehicles, checkCongestion };
