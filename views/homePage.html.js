const h = require('hyperscript');

const HomePage = () => h('section', {
  class: 'homePage'
}, [
  h('div', {id: 'main'}, 'Home'),
  h('script', {src: '/js/app.js'}, )
]);

module.exports = HomePage;
