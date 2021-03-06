

// const ImageLoader = function(imageId, baseUrl, sizeX, sizeY, zStart, zStop, tStart, tStop, callback, rdef) {

const ImageLoader = function(imageId, zStart, zEnd, tStart, tEnd, channels, callback) {

    const img = new Image();

    var status = "unloaded";  // 'loading', 'loaded'

    img.onload = function() {
        status = "loaded";
        callback("loaded");
    };

    var getQuery = function() {
        var query = channels.map((ch, idx) => {
            var w = ch.window;
            return ch.active ? `${ idx + 1 }|${ w.start }:${ w.end }$${ ch.color }` : `-${ idx + 1 }`
        });
        return query.join(',');
    }

    var getSrcUrl = function() {
        let url = window.PLAYER_INDEX + `render_stitched_image/${ imageId }/?z=${ zStart }-${ zEnd }&t=${ tStart }-${ tEnd }`
        // if (zStop !== zStart) {
        //     url += '-' + zStop;
        // }    
        // url += '&theT=' + tStart;
        // if (tStart !== tStop) {
        //     url += '-' + tStop;
        // }
        url += '&c=' + getQuery();
        return url;
    };

    this.getStatus = function() {
        return status;
    };

    this.load = function() {
        status = "loading";
        img.src = getSrcUrl();
    };

    this.getImgAndCoords = function(theZ, theT) {
        // if (!this.containsPlane(theZ, theT)) {
        //     return;
        // }
        if (status !== "loaded") {
            return;
        }
        var offset = (theZ - zStart) + (theT - tStart); 
        // image is simply a row of planes - offset is sizeX * offset
        return {'img':img,
                'x': offset,
                'y': 0,
                'width': img.width,
                'height': img.height,
            };
    };

    this.containsPlane = function(z, t) {
        if (z < zStart) return false;
        if (z >= zEnd) return false;
        if (t < tStart) return false;
        if (t >= tEnd) return false;
        return true;
    };

    this.load();
};

export default ImageLoader
