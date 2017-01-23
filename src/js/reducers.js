
import {TOGGLE_CHANNEL, INCREMENT_Z, INCREMENT_T} from './actions';
import {CHANNEL_COLOR, TOGGLE_MOVIE} from './actions';
import {START_FETCHING, RECEIVE_IMAGE, RECEIVE_PLANE, SET_T, SET_Z} from './actions';
import {incrementT} from './actions';
import {SET_LAYOUT, SET_ZOOM, SET_CHANNEL_WINDOW, Layouts} from './actions';

// Initial state of the App.
const initialState = {
    isFetching: false,
    isPlayingMovie: false,
    theZ: 0,
    theT: 0,
    sizeZ: 0,
    sizeT: 0,
    sizeX: 1,
    sizeY: 1,
    zoom: 100,
    channels: [],
    loadedPlanes: [],   // list of ["z,t", ] E.g. "1,0"
    layout: Layouts.FULL_VIEWER,
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
        case SET_CHANNEL_WINDOW:
            return state.map((channel, index) => {
                if (index === action.index) {
                    let newWindow = Object.assign({}, channel.window, action.window)
                    return Object.assign({}, channel, {
                        window: newWindow
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
    let theZ;
    let theT;
    switch (action.type) {
        case START_FETCHING:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_PLANE:
            let loadedPlanes = state.loadedPlanes;
            for (let z=action.zStart; z<action.zEnd; z++) {
                for (let t=action.tStart; t<action.tEnd; t++) {
                    const key = `${ z },${ t }`;
                    // If key is already in list, return list else return list with key
                    loadedPlanes = loadedPlanes.indexOf(key) > -1 ? loadedPlanes : [...loadedPlanes, key]
                }
            }
            console.log("LOADED_PLANES", loadedPlanes);
            return Object.assign({}, state, {
                loadedPlanes,
                isFetching: false,
            })
        case RECEIVE_IMAGE:
            let json = action.json;
            let channels = json.channels.map((channel, idx) => {
                    return {active: channel.active,
                        color: channel.color,
                        label: channel.label,
                        window: channel.window,
                        id: idx}
                })
            return Object.assign({}, state, {
                isFetching: false,
                theZ: json.rdefs.defaultZ,
                theT: json.rdefs.defaultT,
                sizeZ: json.size.z,
                sizeT: json.size.t,
                sizeX: json.size.width,
                sizeY: json.size.height,
                channels,
                imageId: json.id
            })
        case INCREMENT_Z:
            theZ = state.theZ + action.increment;
            theZ = Math.max(0, Math.min(theZ, state.sizeZ-1))
            return Object.assign({}, state, {theZ})
        case SET_Z:
            theZ = Math.max(0, Math.min(action.theZ, state.sizeZ-1))
            return Object.assign({}, state, {
                theZ,
                sliding: action.sliding,
            })
        case INCREMENT_T:
            theT = state.theT + action.increment;
            theT = Math.max(0, Math.min(theT, state.sizeT-1))
            return Object.assign({}, state, {theT})
        case SET_T:
            theT = Math.max(0, Math.min(action.theT, state.sizeT-1))
            return Object.assign({}, state, {
                theT,
                sliding: action.sliding,
            })
        case SET_ZOOM:
            return Object.assign({}, state, {
                zoom: parseInt(action.zoom, 10)
            })
        case TOGGLE_MOVIE:
            return Object.assign({}, state, {
                isPlayingMovie: !state.isPlayingMovie
            }) 
        // If the action affects channels, handled by channels()
        case TOGGLE_CHANNEL:
        case SET_CHANNEL_WINDOW:
        case CHANNEL_COLOR:
            console.log('SLIDING', action.sliding);
            let s = Object.assign({}, state, {
                // If rendering has changed, we clear loadedPlanes
                // if (!action.sliding) {
                // loadedPlanes: [],
                channels: updateChannels(state.channels, action)
            });
            // If rendering has changed (and we're not 'sliding', we clear loadedPlanes
            if (!action.sliding) {
                s.loadedPlanes = [];
            }
            return s;
        case SET_LAYOUT:
            return Object.assign({}, state, {
                layout: action.layout
            })
        default:
            return state;
    }   
}
