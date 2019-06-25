import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../store/reducers/reducer';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, loggingMiddleware))
);
