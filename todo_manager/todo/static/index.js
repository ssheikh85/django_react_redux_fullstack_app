import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import store from './store';
import App from '../client/components/App';

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,

//   document.getElementById('app')
// );

ReactDOM.render(<App />, document.getElementById('app'));
