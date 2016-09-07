
import fetch from 'isomorphic-fetch'
import axios from 'axios';

export const INCREMENT_Z = "INCREMENT_Z";
export const TOGGLE_CHANNEL = "TOGGLE_CHANNEL";
export const CHANNEL_COLOR = "CHANNEL_COLOR";
export const SET_IMAGE = "SET_IMAGE";

export const REQUEST_IMAGE = "REQUEST_IMAGE";
export const RECEIVE_IMAGE = "RECEIVE_IMAGE";


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

export function requestImage(imageId) {
	return { type: REQUEST_IMAGE, imageId }
}

export function receiveImage(json) {
	console.log('receiveImage', json);
	return { type: RECEIVE_IMAGE, json }
}

export function fetchImage(imageId) {
	return function (dispatch) {
		dispatch(requestImage(imageId))
		return axios.get('/webgateway/imgData/' + imageId + '/')
			.then(response => response.data)
			.then(json => 
				dispatch(receiveImage(json))
			)
	}
}