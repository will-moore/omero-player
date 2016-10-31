
const PlaneCache = function(dispatch) {

    const imageLoaders = [];

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');


    const renderPlane = (plane, channels) => {

        let fRed = function(c1, c2, c3, c4) {
            // which active channels contribute to Red?
            return 0;
        }
        let fGreen = function(c1, c2, c3, c4) {
            return 0;
        }
        let fBlue = function(c1, c2, c3, c4) {
            return 0;
        };


        // 0, 0, 1, 0
        let reds = channels.map((ch) => (
            ch.active ? parseInt(ch.color.slice(0,2), 16)/255 : 0 )
        )
        console.log('reds', reds);
        let chsWithRed = reds.reduce((prev, ch, idx) => {
            if (ch > 0) {
                prev.push(idx);
            }
            return prev;
        }, []);
        console.log('chsWithRed', chsWithRed);
        // If only a single channel has some red...
        if (chsWithRed.length === 1) {
            let activeRedIdx = chsWithRed[0];
            let redFraction = reds[activeRedIdx];
            console.log(activeRedIdx, redFraction);
            fRed = function(...inputsChs) {
                return inputsChs[activeRedIdx] * redFraction;
            }
        } else {
            // need to combine red from multiple channels
            
        }
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

        console.log('render...', channels);
        let l = plane.data.length / 4;
        // ...finally apply functions to every red/green/blue pixel
        let output = context.createImageData(512, 512);
        for (let i = 0; i < l; i++) {
            // console.log('pixel', i);
            // for each pixel...
            // for each channel that is active...
            // convert it to r,g,b
            // let red = 0, green = 0, blue = 0;
            // for (let c=0; c<4; c++) {
            //     if (channels[c] && channels[c].active) {
            //         // color to rgb
            //         if (channels[c].color === 'FF0000') {
            //             red = plane.data[i * 4 + c]
            //         } else if (channels[c].color === '00FF00') {
            //             green = plane.data[i * 4 + c]
            //         } else if (channels[c].color === '0000FF') {
            //             blue = plane.data[i * 4 + c]
            //         }
            //     }
            // }
            // output[i * 4] = red;
            // output[i * 4 + 1] = green;
            // output[i * 4 + 2] = blue;
            // output[i * 4 + 3] = plane.data[i * 4 + 3];
            let c1 = plane.data[i * 4 + 0],
                c2 = plane.data[i * 4 + 1],
                c3 = plane.data[i * 4 + 2],
                c4 = plane.data[i * 4 + 3];
            let red = fRed(c1, c2, c3);
            plane.data[i * 4 + 0] = red;
            let green = fGreen(c1, c2, c3);
            plane.data[i * 4 + 1] = green;
            let blue = fBlue(c1, c2, c3);
            plane.data[i * 4 + 2] = blue;
        }
        // plane.data = output;
        console.log("...done");

        return plane;
    }


    return {

        getImgAndCoords: ( {img, x, y, width, height, channels}) => {

            canvas.width = width
            canvas.height = height
            context.drawImage(img, x, y, img.width, img.height);
            var plane = context.getImageData(0, 0, img.width, img.height);

            plane = renderPlane(plane, channels);
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