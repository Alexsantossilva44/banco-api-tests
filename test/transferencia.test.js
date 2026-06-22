const request = require('supertest');
const { expect } = require('chai');
const { autenticar } = require('../helpers/autentication');
const { postTransferencia } = require('../fixtures/postTransferencia');
const { postLogin } = require('../fixtures/postLogin');
require('dotenv').config();

const api = () => request(process.env.BASE_URL);

describe('Transferencias', () => {
  let token;

  beforeEach(async () => {
    token = await autenticar(postLogin('julio.lima', '123456'));
  });

  const transferir = (valor) =>
    api()
      .post('/transferencias')
      .set('Authorization', `Bearer ${token}`)
      .send(postTransferencia(valor));

  describe('POST /transferencias', () => {
    it('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de R$ 10,00.', async () => {
      const res = await transferir(11);
      expect(res.status).to.equal(201);
    });

    it('Deve retornar falha com 422 quando o valor da transferencia for abaixo de R$ 10,00.', async () => {
      const res = await transferir(7);
      expect(res.status).to.equal(422);
    });
  });

  describe('GET /transferencias/{id}', () => {
    it('Deve retornar sucesso com 200 e os detalhes de uma transferencia específica no banco de dados, quando o id for válido.', async () => {
      const res = await api()
        .get('/transferencias/1')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });
});
