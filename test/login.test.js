const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('Login', () => {
  describe('POST /login', () => {
    it('Deve autenticar o usuário com credenciais válidas', async () => {
      const response = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({ username: 'julio.lima', senha: '123456' });
      // Test implementation

      //console.log('Response Body:', response.body); // Log the response body for debugging
      //console.log('Response Status:', response.status); // Log the response status for debugging

      expect(response.status).to.equal(200);
      expect(response.body.token).to.be.a('string');
    });
  });
});
