
import {TOGGLE_CHANNEL, INCREMENT_Z} from './actions';
import {CHANNEL_COLOR} from './actions';
import {START_FETCHING, RECEIVE_IMAGE, RECEIVE_PLANE, SET_T} from './actions';


// Initial state of the App.
const initialState = {
    isFetching: false,
    theZ: 0,
    theT: 0,
    sizeZ: 1,
    sizeT: 1,
    channels: [],
    loadedPlanes: [],   // list of ["z,t", ] E.g. "1,0"
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
    switch (action.type) {
        case START_FETCHING:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_PLANE:
            const key = `${ action.theZ },${ action.theT }`;
            return Object.assign({}, state, {
                isFetching: false,
                // If key is already in list, return list else return list with key
                loadedPlanes: state.loadedPlanes.indexOf(key) > -1 ? state.loadedPlanes : [
                    ...state.loadedPlanes, key
                ]
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
                theT: json.rdefs.defaultT,
                sizeZ: json.size.z,
                sizeT: json.size.t,
                channels,
                imageId: json.id
            })
        case INCREMENT_Z:
            return Object.assign({}, state, {
                theZ: state.theZ + action.increment
            })
        case SET_T:
            const theT = Math.max(0, Math.min(action.theT, state.sizeT-1))
            return Object.assign({}, state, {
                theT,
                sliding: action.sliding,
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
