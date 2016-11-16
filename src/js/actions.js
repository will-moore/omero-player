
import fetch from 'isomorphic-fetch'
import axios from 'axios';

export const INCREMENT_Z = "INCREMENT_Z";
export const SET_Z = "SET_Z";
export const INCREMENT_T = "INCREMENT_T";
export const SET_T = "SET_T";
export const TOGGLE_MOVIE = "TOGGLE_MOVIE";
export const TOGGLE_CHANNEL = "TOGGLE_CHANNEL";
export const CHANNEL_COLOR = "CHANNEL_COLOR";
export const SET_CHANNEL_WINDOW = "SET_CHANNEL_WINDOW";
export const SET_ZOOM = "SET_ZOOM";
export const SET_IMAGE = "SET_IMAGE";

export const START_FETCHING = "START_FETCHING";
export const RECEIVE_IMAGE = "RECEIVE_IMAGE";
export const RECEIVE_PLANE = "RECEIVE_PLANE";

export const SET_LAYOUT = "SET_LAYOUT";
export const Layouts = {
	FULL_VIEWER: 'FULL_VIEWER',
	GRID_LAYOUT: 'GRID_LAYOUT',
}

export function setLayout(layout) {
	return { type: SET_LAYOUT, layout }
}

export function toggleMovie() {
	return { type: TOGGLE_MOVIE };
}

export function incrementZ() {
	return { type: INCREMENT_Z, increment: 1};
}

export function decrementZ() {
	return { type: INCREMENT_Z, increment: -1};
}

export function setZ(theZ, sliding=false) {
	return { type: SET_Z, theZ, sliding };
}

export function incrementT() {
	return { type: INCREMENT_T, increment: 1};
}

export function decrementT() {
	return { type: INCREMENT_T, increment: -1};
}

export function setT(theT, sliding=false) {
	return { type: SET_T, theT, sliding };
}

export function setZoom(zoom) {
	return { type: SET_ZOOM, zoom };
}

export function toggleChannel(index) {
	return { type: TOGGLE_CHANNEL, index }
}

export function setChannelWindow(index, window, sliding=false) {
	return { type: SET_CHANNEL_WINDOW, index, window, sliding}
}

export function setChannelColor(index, color) {
	return { type: CHANNEL_COLOR, index, color}
}

export function setImage(theZ, channels) {
	return { type: SET_IMAGE, theZ, channels}
}

export function startFetching() {
	return { type: START_FETCHING }
}

export function recievePlane(theZ, theT) {
	return { type: RECEIVE_PLANE, theZ, theT }
}

export function receiveImage(json) {
	console.log('receiveImage', json);
	return { type: RECEIVE_IMAGE, json }
}

export function fetchImage(imageId) {
	return function (dispatch) {
		dispatch(startFetching())
		return axios.get('/webgateway/imgData/' + imageId + '/')
			.then(response => response.data)
			.then(json => 
				dispatch(receiveImage(json))
			)
	}
}