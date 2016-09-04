
// import { createStore } from 'redux'

export const INCREMENT_Z = "INCREMENT_Z";
export const TOGGLE_CHANNEL = "TOGGLE_CHANNEL";
export const CHANNEL_COLOR = "CHANNEL_COLOR";

export function incrementZ() {
	return { type: INCREMENT_Z, increment: 1};
}

export function decrementZ() {
	return { type: INCREMENT_Z, increment: -1};
}

export function toggleChannel(index) {
	return { type: TOGGLE_CHANNEL, index }
}

export function setChannelColor(index, color) {
	return { type: CHANNEL_COLOR, index, color}
}
