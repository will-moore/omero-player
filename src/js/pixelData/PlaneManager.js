
import { startFetching, recievePlane } from '../actions'
import ImageLoader from './ImageLoader'
// import PlaneCache from './PlaneCache'

// PlaneManager.loadPlane() is called when a Component wants to
// render a plane.
// When it loads, the store is updated so it knows what planes are loaded.
// PlaneManager.getImgAndCoords() is called when a Component
// wants to display the plane (and it is loaded)
const PlaneManager = function(dispatch) {

    let imageLoaders = [];
    // const planeCache = PlaneCache();

    return {

        clearPlanes: () => {
            imageLoaders = [];
        },

        loadPlane: (iid, zStart, zEnd, tStart, tEnd, channels) => {
            // set 'isFetching' to true...
            dispatch(startFetching());
            // Create a new loader, callback updates the store
            const loader = new ImageLoader(iid, zStart, zEnd, tStart, tEnd, channels, function(){
                dispatch(recievePlane(zStart, zEnd, tStart, tEnd));
            });
            // Add loader to list, so we can use it to get plane later
            imageLoaders.push(loader);
        },

        getImgAndCoords: (theZ, theT) => {
            for (var i=0; i<imageLoaders.length; i++) {
                if (imageLoaders[i].containsPlane(theZ, theT)) {
                    let imgCoords = imageLoaders[i].getImgAndCoords(theZ, theT);
                    // imgCoords.channels = channels;
                    // imgCoords = planeCache.getImgAndCoords(imgCoords);
                    return imgCoords;
                }
            }
        }

    }
}

export default PlaneManager
