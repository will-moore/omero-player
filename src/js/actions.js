
// import { createStore } from 'redux'

export const INCREMENT_Z = "INCREMENT_Z";
export const TOGGLE_CHANNEL = "TOGGLE_CHANNEL";
export const CHANNEL_COLOR = "CHANNEL_COLOR";
export const SET_IMAGE = "SET_IMAGE";

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

export function setImage(theZ, channels) {
	return { type: SET_IMAGE, theZ, channels}
}
