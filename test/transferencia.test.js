const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { autenticar } = require('../helpers/autentication');
const { postTransferencia } = require('../fixtures/postTransferencia');
const { postLogin } = require('../fixtures/postLogin');

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
        .get('/transferencias/18')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.conta_origem_id).to.equal(1);
      expect(res.body.conta_destino_id).to.equal(2);
      expect(res.body.valor).to.equal('11.00');
    });
  });

  describe('GET /transferencias', () => {
    it('Deve retornar retornar 10 elementos na paginação quando informar limite de 10 registros.', async () => {
      const res = await api()
        .get('/transferencias')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body.limit).to.equal(10);
      expect(res.body.transferencias).to.have.lengthOf(10);
      expect(res.body.transferencias).to.be.an('array');
      expect(res.body.transferencias.length).to.equal(10);

      console.log('Quantidade de transferencias retornadas: ', res.body);
    });
  });
});
