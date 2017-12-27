
const Preact = require('preact');
const { h, render, Component } = Preact;

class Form extends Component {
  constructor(props) {
    super(props);
    this.changeText = this.changeText.bind(this);
    this.state = {
      text: ''
    };
  }

  changeText(e) {
    this.setState({
      text: e.target.value
    });
  }

  render(_, state) {
    return h('div', {
    }, [
      h('input', {
        type: 'text',
        value: state.text,
        onKeyUp: this.changeText
      }),
      h('div', {}, state.text)
    ]);
  }
}

render(h(Form), document.getElementById('main'));
