import { h, Component } from 'preact';
import { connect } from 'preact-redux';

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

  render(props, state) {
    return h('div', {
    }, [
      h('input', {
        type: 'text',
        value: state.text,
        onKeyUp: this.changeText
      }),
      h('div', {}, state.text),
      h('div', {}, props.loading)
    ]);
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.ajaxModule
  };
};

export default connect(mapStateToProps)(Form);
