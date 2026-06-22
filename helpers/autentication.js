const request = require('supertest');
require('dotenv').config();

const api = () => request(process.env.BASE_URL);

const autenticar = async (usuario, senha) => {
  const responseLogin = await api().post('/login').send({
    username: usuario,
    senha: senha,
  });

  return responseLogin.body.token;
};

module.exports = {
  autenticar,
};
