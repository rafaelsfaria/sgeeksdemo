const proxy = [
  {
    context: '/api',
    target: 'http://api:3000',
    changeOrigin: true,
  }
];
module.exports = proxy;