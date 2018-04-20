import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleWare from 'redux-logger';
import rootReducer from 'Ducks/root';

const store = createStore(
  rootReducer,
  applyMiddleware(
    loggerMiddleWare,
    thunkMiddleware
  )
);

export default store;
