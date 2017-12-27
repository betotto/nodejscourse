const h = require('hyperscript');
const Menu = require('./menu.html');

const BasePage = (props, children) => h('html', {}, [
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
    h('div', {
      class: 'pure-g'
    }, [
      h('div', { class: 'pure-u-1-4' }, Menu),
      h('div', { class: 'pure-u-3-4' }, children)
    ])
  ])
]);

module.exports = BasePage;
