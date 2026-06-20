const request = require('supertest');
const { expect } = require('chai');

describe('Transferencias', () => {
  describe('POST /transferencias', () => {
    it('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de R$ 10,00.', async () => {
      // Capturar o token de autenticação do usuário logado
      const responseLogin = await request('http://localhost:3000')
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
          username: 'julio.lima',
          senha: '123456',
        });

      const token = responseLogin.body.token;

      const response = await request('http://localhost:3000')
        .post('/transferencias')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`) // Adiciona o token de autenticação no cabeçalho
        .send({
          contaOrigem: 1,
          contaDestino: 2,
          valor: 11,
          token: '',
        });

      expect(response.status).to.equal(201);
    });

    it('Deve retornar falha com 422 quando o valor da transferencia for abaixo de R$ 10,00.', async () => {
      // Capturar o token de autenticação do usuário logado
      const responseLogin = await request('http://localhost:3000')
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
          username: 'julio.lima',
          senha: '123456',
        });

      const token = responseLogin.body.token;

      const response = await request('http://localhost:3000')
        .post('/transferencias')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`) // Adiciona o token de autenticação no cabeçalho
        .send({
          contaOrigem: 1,
          contaDestino: 2,
          valor: 7,
          token: '',
        });

      expect(response.status).to.equal(422);
    });
  });
});
