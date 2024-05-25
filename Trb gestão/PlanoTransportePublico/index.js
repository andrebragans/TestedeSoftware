const { getRoutes, getRouteDetails } = require('../api/data');

document.addEventListener('DOMContentLoaded', () => {
    const routeSelect = document.getElementById('routeSelect');
    const routeDetailsDiv = document.getElementById('route-details');

    const routes = getRoutes();
    routes.forEach(route => {
        const option = document.createElement('option');
        option.value = route.id;
        option.textContent = route.name;
        routeSelect.appendChild(option);
    });

    routeSelect.addEventListener('change', () => {
        const routeId = parseInt(routeSelect.value, 10);
        if (isNaN(routeId)) {
            routeDetailsDiv.innerHTML = '';
            return;
        }

        const routeDetails = getRouteDetails(routeId);
        if (routeDetails) {
            routeDetailsDiv.innerHTML = `
                <h2>${routeDetails.name}</h2>
                <p><strong>Paradas:</strong> ${routeDetails.stops.join(', ')}</p>
                <p><strong>Horários:</strong> ${routeDetails.schedule.join(', ')}</p>
            `;
        } else {
            routeDetailsDiv.innerHTML = 'Detalhes da rota não encontrados.';
        }
    });
});

module.exports = { getRoutes, getRouteDetails }; // Exportar para testes
