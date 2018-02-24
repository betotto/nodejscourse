import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import ChatContainer from './containers/home';
import configureStore from './modules/store';

const store = configureStore();

render(h(Provider, {store}, [
  h(ChatContainer)
]), document.getElementById('main'));
