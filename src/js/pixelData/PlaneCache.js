
const PlaneCache = function(dispatch) {

    const imageLoaders = [];

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');


    const getColorFunc = (channels, colorIdx) => {
        console.log('Color:', colorIdx, channels);
        // channels is json channels data, colorIdx is 0 (red), 1 (green) or 2 (blue)

        // for the current color, check how much each channel will contribute
        // as a fraction of it's intensity.
        // E.g. channels are ['0000FF', '00FF00', '0000FF'] then
        // colorFractions for red will be [0, 0, 1.0] (3rd channel is 100% red)
        let colorFractions = channels.map((ch) => {
            let hex = ch.color.slice(colorIdx * 2, (colorIdx + 1) * 2);
            // If active, calculate fraction of 255
            return ch.active ? parseInt(hex, 16)/255 : 0
        })
        console.log('colorFractions', colorFractions);
        // Check which channels will contribute to color
        // because if it's only 1, we can optimise mapping
        // Return a list of channel indexes
        let chsWithColor = colorFractions.reduce((prev, ch, idx) => {
            if (ch > 0) {
                prev.push(idx);
            }
            return prev;
        }, []);

        // default function if no channels 
        let fRed = () => (0)

        console.log('chsWithColor', chsWithColor);
        // If only a single channel has some of this color...
        if (chsWithColor.length === 1) {
            let activeRedIdx = chsWithColor[0];
            let redFraction = colorFractions[activeRedIdx];
            console.log(activeRedIdx, redFraction)
            fRed = function(...inputsChs) {
                return inputsChs[activeRedIdx] * redFraction;
            }
        } else if (chsWithColor.length > 1) {
            // need to combine red from multiple channels
            fRed = function(...inputChs) {
                let redValues = inputChs.map((ch, idx) => (colorFractions[idx] * ch))
                return Math.max(...redValues);
            }
        }
        return fRed;
    }

    const renderPlane = (plane, channels) => {

        let fRed = getColorFunc(channels, 0);
        let fGreen = getColorFunc(channels, 1);
        let fBlue = getColorFunc(channels, 2);

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