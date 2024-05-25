// backend/tests/users.test.js
const request = require('supertest');
const app = require('../app');

let server;

beforeEach(() => {
    server = app.listen(3000);
});

afterEach((done) => {
    server.close(done);
});

describe('POST /api/users', () => {
    it('should create a new user', async () => {
        const newUser = {
            name: 'John Doe',
            address: '123 Main St',
            vehicle: 'Honda Civic'
        };
        const response = await request(app)
            .post('/api/users')
            .send(newUser);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(newUser.name);
    });

    it('should return 400 if any field is missing', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({});
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'All fields are required' });
    });
});

describe('GET /api/users', () => {
    it('should return list of users', async () => {
        const response = await request(app).get('/api/users');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    });
});
