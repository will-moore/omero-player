
import {TOGGLE_CHANNEL, INCREMENT_Z} from './actions';
import {CHANNEL_COLOR} from './actions';
import {REQUEST_IMAGE, RECEIVE_IMAGE} from './actions';
import { routerReducer } from 'react-router-redux'


// Initial state of the App.
const initialState = {
    isFetching: false,
    theZ: 0,
    channels: []
}

// Handles updating the state of channels for various actions
function updateChannels(state = [], action) {

    switch (action.type) {
        case TOGGLE_CHANNEL:
            return state.map((channel, index) => {
                if (index === action.index) {
                    return Object.assign({}, channel, {
                        active: !channel.active
                    })
                }
                return channel;
            })
        case CHANNEL_COLOR:
            return state.map((channel, index) => {
                if (index === action.index) {
                    return Object.assign({}, channel, {
                        color: action.color
                    })
                }
                return channel;
            })
        default:
            return state
    }
}

// Our main App reducer. Handles ALL state changes
export default function playerApp(state = initialState, action) {

    state.routing = routerReducer(state.routing, action)       // keep track of route

    switch (action.type) {
        case REQUEST_IMAGE:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_IMAGE:
            let json = action.json;
            let channels = json.channels.map((channel, idx) => {
                    return {active: channel.active,
                        color: channel.color,
                        label: channel.label,
                        id: idx}
                })
            return Object.assign({}, state, {
                isFetching: false,
                theZ: json.rdefs.defaultZ,
                channels
            })
        case INCREMENT_Z:
            return Object.assign({}, state, {
                theZ: state.theZ + action.increment
            })
        // If the action affects channels, handled by channels()
        case TOGGLE_CHANNEL:
        case CHANNEL_COLOR:
            return Object.assign({}, state, {
                channels: updateChannels(state.channels, action)
            })
        default:
            return state;
    }   
}
