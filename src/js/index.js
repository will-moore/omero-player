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
import { syncHistoryWithStore } from 'react-router-redux'


const loggerMiddleware = createLogger()

let store = createStore(
                playerApp,
                applyMiddleware(
                    thunkMiddleware, // lets us dispatch() functions
                    loggerMiddleware // neat middleware that logs actions
                )
            );

// store.subscribe(() => {
//     console.log('subscribe', store.getState())
// })

// store.dispatch(fetchImage(3732));

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/player/image/(:imageId)/" component={App} />
        </Router>
    </Provider>,
  document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));
