const h = require('hyperscript');

const menuItems = [
  {
    link: './chat.html',
    text: 'Chat'
  },
  {
    link: './session.html',
    text: 'Chat Sessions'
  }
];

const Menu = () => h('aside', {
  class: 'pure-menu'
}, [
  h('div', {class: 'pure-menu-heading'}, 'Small Chat'),
  h('ul', {class: 'pure-menu-list'}, menuItems.map((item) =>
    h('li', {class: 'pure-menu-item'}, [
      h('a', {class: 'pure-menu-link', href: item.link}, item.text)
    ])
  ))
]);

module.exports = Menu;
