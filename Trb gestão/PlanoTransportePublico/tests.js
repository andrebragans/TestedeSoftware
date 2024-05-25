/**
 * @jest-environment jsdom
 */

const { getRoutes, getRouteDetails } = require('../api/data');

describe('Planejamento de Transporte Público', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div>
                <h1>Planejamento de Transporte Público</h1>
                <select id="routeSelect">
                    <option value="">Selecione uma rota</option>
                </select>
                <div id="route-details"></div>
            </div>
        `;

        const { getRoutes, getRouteDetails } = require('../api/data');
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

    test('getRoutes should return all routes', () => {
        const routes = getRoutes();
        expect(routes).toHaveLength(2);
        expect(routes[0].name).toBe('Rota 1');
        expect(routes[1].name).toBe('Rota 2');
    });

    test('getRouteDetails should return correct route details', () => {
        const routeDetails = getRouteDetails(1);
        expect(routeDetails).toBeDefined();
        expect(routeDetails.name).toBe('Rota 1');
        expect(routeDetails.stops).toEqual(['Ponto A', 'Ponto B', 'Ponto C']);
        expect(routeDetails.schedule).toEqual(['08:00', '12:00', '16:00']);
    });

    test('selecting a route should display route details', () => {
        const routeSelect = document.getElementById('routeSelect');
        const routeDetailsDiv = document.getElementById('route-details');

        routeSelect.value = '1';
        routeSelect.dispatchEvent(new Event('change'));

        expect(routeDetailsDiv.innerHTML).toContain('Rota 1');
        expect(routeDetailsDiv.innerHTML).toContain('Ponto A, Ponto B, Ponto C');
        expect(routeDetailsDiv.innerHTML).toContain('08:00, 12:00, 16:00');
    });

    test('selecting an invalid route should clear route details', () => {
        const routeSelect = document.getElementById('routeSelect');
        const routeDetailsDiv = document.getElementById('route-details');

        routeSelect.value = '';
        routeSelect.dispatchEvent(new Event('change'));

        expect(routeDetailsDiv.innerHTML).toBe('');
    });
});
