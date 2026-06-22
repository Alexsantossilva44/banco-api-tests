const postTransferencia = (valor) => ({
  contaOrigem: 1,
  contaDestino: 2,
  valor,
  token: '',
});

module.exports = { postTransferencia };
