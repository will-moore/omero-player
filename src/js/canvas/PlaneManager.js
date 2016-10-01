
import { startFetching, recievePlane } from '../actions'


const PlaneManager = function(dispatch) {
    
    const img = new Image();
    let theZ = 0;
    let theT = 0;

    img.onload = function() {
        // dispatch action to say 'loaded'
        dispatch(recievePlane(theZ, theT));
    };

    function getImgSrc(imgId, z, t, channels) {
        const chs = channels.map((c, idx) => {

            if (!c.active) return "";
            const wStart = 5, wEnd = 200;
            return `${idx + 1}|${wStart}:${wEnd}$${c.color}`
        });
        return `/webgateway/render_image/${ imgId }/${ z }/?${ t }/c=${ chs.join(',') }`;
    }

    return {

        loadPlane: (iid, z, t, channels) => {

            theZ = z;
            theT = t;
            // set 'isFetching' to true...
            dispatch(startFetching());

            const src = getImgSrc(iid, z, t, channels);
            img.src = src;
        }

    }
}

export default PlaneManager
