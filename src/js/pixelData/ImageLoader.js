

// const ImageLoader = function(imageId, baseUrl, sizeX, sizeY, zStart, zStop, tStart, tStop, callback, rdef) {

const ImageLoader = function(imageId, zStart, tStart, callback) {

    const img = new Image();

    var status = "unloaded";  // 'loading', 'loaded'

    img.onload = function() {
        status = "loaded";
        callback("loaded");
    };

    var getSrcUrl = function() {
        // var url = baseUrl + 'render_multi_planes/' + imageId + '/?theZ=' + zStart;
        // if (zStop !== zStart) {
        //     url += '-' + zStop;
        // }
        // url += '&theT=' + tStart;
        // if (tStart !== tStop) {
        //     url += '-' + tStop;
        // }
        // url += '&c=' + rdef;
        // return url;
        return `/webgateway/render_image/${ imageId }/${ zStart }/${ tStart }/`
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
        // var offset = (theZ - zStart) + (theT - tStart); 
        // image is simply a row of planes - offset is sizeX * offset
        return {'img':img,
                // 'x': offset * sizeX,
                'x': 0,
                'y': 0,
                // 'width': sizeX,
                // 'height': sizeY,
            };
    };

    this.containsPlane = function(z, t) {
        if (z != zStart) return false;
        // if (z > zStop) return false;
        if (t != tStart) return false;
        // if (t > tStop) return false;
        return true;
    };

    this.load();
};

export default ImageLoader
