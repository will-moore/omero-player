import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import axios from 'axios';
import playerApp from './reducers';
import { Provider } from 'react-redux';
import { setImage } from './actions'


let store = createStore(playerApp);

// store.subscribe(() => {
//     console.log('subscribe', store.getState())
// })

axios.get('/webgateway/imgData/3728/').then(function(rsp){
    console.log(rsp.data);
    let theT = rsp.data.rdefs.defaultT;
    let theZ = rsp.data.rdefs.defaultZ;
    let channels = rsp.data.channels.map((channel, idx) => {
        return {active: channel.active,
                color: channel.color,
                label: channel.label,
                id: idx}
    })
    store.dispatch(setImage(theZ, channels));
});


ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));
