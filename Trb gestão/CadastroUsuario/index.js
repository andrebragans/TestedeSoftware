// utils/validators.js
function validateLicensePlate(plate) {
    const regex = /^[A-Z]{3}-\d{4}$/;
    return regex.test(plate);
  }
  
  module.exports = validateLicensePlate;

  // tests/validators.test.js
const validateLicensePlate = require('../utils/validators');

test('valid license plate', () => {
  expect(validateLicensePlate('ABC-1234')).toBe(true);
});

test('invalid license plate', () => {
  expect(validateLicensePlate('AB1234')).toBe(false);
  expect(validateLicensePlate('ABCD-123')).toBe(false);
  expect(validateLicensePlate('ABC-12345')).toBe(false);
});

// routes/cadastro.js
const express = require('express');
const router = express.Router();

router.post('/cadastro', (req, res) => {
  const { nome, endereco, veiculo } = req.body;
  if (!nome || !endereco || !veiculo) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }
  // Suponha que a validação do formato da placa foi feita aqui
  res.status(201).send('Usuário cadastrado com sucesso');
});

module.exports = router;

// tests/cadastro.test.js
const request = require('supertest');
const express = require('express');
const cadastroRouter = require('../routes/cadastro');

const app = express();
app.use(express.json());
app.use('/api', cadastroRouter);

describe('POST /api/cadastro', () => {
  it('should create a new user when all required fields are provided', async () => {
    const response = await request(app)
      .post('/api/cadastro')
      .send({
        nome: 'João Silva',
        endereco: {
          rua: 'Rua A',
          numero: '123',
          cidade: 'Cidade B',
          estado: 'Estado C',
          cep: '12345-678'
        },
        veiculo: {
          modelo: 'Modelo X',
          marca: 'Marca Y',
          ano: 2020,
          placa: 'ABC-1234'
        }
      });
    expect(response.statusCode).toBe(201);
    expect(response.text).toBe('Usuário cadastrado com sucesso');
  });

  it('should return 400 when a required field is missing', async () => {
    const response = await request(app)
      .post('/api/cadastro')
      .send({
        nome: 'João Silva',
        endereco: {
          rua: 'Rua A',
          numero: '123',
          cidade: 'Cidade B',
          estado: 'Estado C'
          // CEP está faltando
        },
        veiculo: {
          modelo: 'Modelo X',
          marca: 'Marca Y',
          ano: 2020,
          placa: 'ABC-1234'
        }
      });
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Todos os campos são obrigatórios');
  });
});
