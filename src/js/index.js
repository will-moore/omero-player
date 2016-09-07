import React from 'react';
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

// store.subscribe(() => {
//     console.log('subscribe', store.getState())
// })

store.dispatch(fetchImage(3728));


ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));
