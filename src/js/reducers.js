
import {incrementZ, decrementZ, INCREMENT_Z} from './actions';

const initialState = {
    theZ: 0
}

export default function playerApp(state = initialState, action) {
    console.log('playerApp', state, action.type, INCREMENT_Z);
    switch (action.type) {
        case INCREMENT_Z:
            let z = state.theZ;
            z = z + action.increment;
            console.log('z', z);
            return Object.assign({}, state, {
                theZ: z
            })
        default:
            return state
    }   
}
