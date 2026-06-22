const request = require('supertest');
require('dotenv').config();

const api = () => request(process.env.BASE_URL);

const autenticar = async (body) => {
  const responseLogin = await api().post('/login').send(body);

  return responseLogin.body.token;
};

module.exports = {
  autenticar,
};
