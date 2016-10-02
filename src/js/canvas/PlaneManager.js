
import { startFetching, recievePlane } from '../actions'
import ImageLoader from './ImageLoader'

// PlaneManager.loadPlane() is called when a Component wants to
// render a plane.
// When it loads, the store is updated so it knows what planes are loaded.
// PlaneManager.getImgAndCoords() is called when a Component
// wants to display the plane (and it is loaded)
const PlaneManager = function(dispatch) {

    const imageLoaders = [];

    return {

        loadPlane: (iid, z, t, channels) => {
            // set 'isFetching' to true...
            dispatch(startFetching());
            // Create a new loader, callback updates the store
            const loader = new ImageLoader(iid, z, t, function(){
                dispatch(recievePlane(z, t));
            });
            // Add loader to list, so we can use it to get plane later
            imageLoaders.push(loader);
        },

        getImgAndCoords: (theZ, theT) => {
            for (var i=0; i<imageLoaders.length; i++) {
                if (imageLoaders[i].containsPlane(theZ, theT)) {
                    return imageLoaders[i].getImgAndCoords(theZ, theT);
                }
            }
        }

    }
}

export default PlaneManager
