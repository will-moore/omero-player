
import {incrementZ, decrementZ, toggleChannel, TOGGLE_CHANNEL, INCREMENT_Z} from './actions';
import {setChannelColor, CHANNEL_COLOR} from './actions';
import {setImage, SET_IMAGE} from './actions';


// Initial state of the App.
const initialState = {
    theZ: 0,
    channels: []
}

// Handles updating the state of channels for various actions
function channels(state = [], action) {

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
    switch (action.type) {
        case SET_IMAGE:
            return {
                theZ: action.theZ,
                channels: action.channels
            }
        case INCREMENT_Z:
            return Object.assign({}, state, {
                theZ: state.theZ + action.increment
            })
        // If the action affects channels, handled by channels()
        case TOGGLE_CHANNEL:
        case CHANNEL_COLOR:
            return Object.assign({}, state, {
                channels: channels(state.channels, action)
            })
        default:
            return state;
    }   
}
