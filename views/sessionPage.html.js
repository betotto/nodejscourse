const h = require('hyperscript');

const SessionPage = () => h('div', {

}, [
  h('div', {}, 'hello'),
  h('script', { src: '/js/app.js' })
]);

module.exports = SessionPage;
