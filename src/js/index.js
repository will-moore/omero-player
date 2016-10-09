import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import App from './App';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
import playerApp from './reducers';
import { Provider } from 'react-redux';
import { fetchImage } from './actions'

const loggerMiddleware = createLogger()

let store = createStore(
    playerApp,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
);

// We pass imageId as a prop of App component
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/player/image/(:imageId)/" component={App} />
        </Router>
    </Provider>, document.getElementById('root'));
