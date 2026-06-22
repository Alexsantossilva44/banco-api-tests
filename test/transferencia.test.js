const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { autenticar } = require('../helpers/autentication');

const api = () => request(process.env.BASE_URL);

describe('Transferencias', () => {
  let token;

  beforeEach(async () => {
    token = await autenticar('julio.lima', '123456');
  });

  const transferir = (valor) =>
    api().post('/transferencias').set('Authorization', `Bearer ${token}`).send({
      contaOrigem: 1,
      contaDestino: 2,
      valor: valor,
      token: '',
    });

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
});
