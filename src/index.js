import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from "./js/store";
import { Provider } from 'react-redux';
import { fecthCountries } from "./js/actions";
import * as serviceWorker from './serviceWorker';

store.dispatch(fecthCountries());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
