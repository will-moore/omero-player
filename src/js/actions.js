
// import { createStore } from 'redux'

export const INCREMENT_Z = "INCREMENT_Z";

export function incrementZ() {
	return { type: INCREMENT_Z, increment: 1};
}

export function decrementZ() {
	return { type: INCREMENT_Z, increment: -1};
}
