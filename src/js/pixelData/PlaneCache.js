
const PlaneCache = function(dispatch) {

    const imageLoaders = [];

    var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');


	const renderPlane = (plane) => {

		var fRed = function(v) {return 0;},
            fGreen = function(v) {return v;},
            fBlue = function(v) {return v;};
        // for each channel, we map plane pixel intensity back to
        // the original raw pixel value, and then map that to
        // the new rendering settings
        // loadedChannels.forEach(function(lc, i){
        //     var start = lc.window.start,
        //         end = lc.window.end,
        //         newStart = channels[i].window.start,
        //         newEnd = channels[i].window.end,
        //         color = lc.color;
        //     if (start !== newStart || end !== newEnd) {
        //         var f = function(red) {
        //             // raw pixel value is a value between 0 - 255 where
        //             // 0 == start and 255 is end
        //             var raw = ((red/255) * (end - start)) + start;
        //             return ((raw - newStart) / (newEnd - newStart)) * 255;
        //         };
        //         // assign this mapping to the correct function/channel...
        //         if (color === 'FF0000') {fRed = f;}
        //         else if (color === '00FF00') {fGreen = f;}
        //         else if (color === '0000FF') {fBlue = f;}
        //     }
        // });

        var l = plane.data.length / 4;
        // ...finally apply functions to every red/green/blue pixel
        for (let i = 0; i < l; i++) {
            let red = fRed(plane.data[i * 4 + 0]);
            plane.data[i * 4 + 0] = red;
            let green = fGreen(plane.data[i * 4 + 1]);
            plane.data[i * 4 + 1] = green;
            let blue = fBlue(plane.data[i * 4 + 2]);
            plane.data[i * 4 + 2] = blue;
        }

        return plane;
	}


    return {

        getImgAndCoords: ( {img, x, y, width, height}) => {

        	canvas.width = width
        	canvas.height = height
        	context.drawImage(img, x, y, img.width, img.height);
            var plane = context.getImageData(0, 0, img.width, img.height);

            plane = renderPlane(plane);
            context.putImageData(plane, 0, 0);

        	// get img, read channels, render channels we want in right colours
        	// put this data on an Image and return that, so it can be applied to canvas.
            return {'img':canvas,
                // 'x': offset * sizeX,
                'x': 0,
                'y': 0,
                'width': width,
                'height': height,
            };
        }

    }
}

export default PlaneCache