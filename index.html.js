const h = require('hyperscript');

const IndexPage = (props) => h('html', {}, [
  h('head', {}, [
    h('title', {}, props.title),
    h('meta', { charset: 'UTF-8'}),
    h('meta', {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }),
    h('link', {
      href: '/css/styles.css',
      rel: 'stylesheet'
    }),
  ]),
  h('body', {}, [
    h('div', {}, 'Hello World from nodejs'),
    h('script', { src: '/js/app.js' })
  ])
]);

module.exports = IndexPage;
