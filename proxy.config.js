const proxy = [
  {
    context: '/api',
    target: 'https://desafio-mean.herokuapp.com',
    // target: 'http://localhost:5000',
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = proxy;
