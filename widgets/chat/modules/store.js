import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../modules';
import thunk from 'redux-thunk';

let middlewares;

if(process.env.NODE_ENV !== 'production') {
  middlewares = compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
} else {
  middlewares = compose(applyMiddleware(thunk));
}

const configureStore = (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    middlewares
  );
};

export default configureStore;
