
import React, { PropTypes } from 'react'

class ImageCanvas extends React.Component {

    componentDidUpdate(nextProps, nextState) {
        // If we have image data loaded...
        if (this.props.channels.length > 0) {
            // We use a key 'z,t' to check if plane is already loaded...
            let theT = 0;
            const key = `${ this.props.theZ },${ theT }`;
            if (this.props.loadedPlanes.indexOf(key) === -1) {
                // if plane is not loaded, load it...
                this.props.planeManager.loadPlane(this.props.imageId, this.props.theZ, theT,
                                                  this.props.channels);
            } else {
                // ...otherwise, plane is loaded, we can get it and draw on canvas
                const source = this.props.planeManager.getImgAndCoords(this.props.theZ, theT);
                if (source) {
                    this.updateCanvas(source.img);
                } else {
                    console.log("NOT FOUND", this.props.theZ, theT);
                }
            }
        }
    }

    componentDidMount() {
        // Start listening for window resize events...
        window.addEventListener('resize', this.updateCanvas.bind(this));
        // Do an initial render of canvas
        this.updateCanvas();
    }

    updateCanvas(img) {
        const canvas = this.refs.canvas;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 50;
        const ctx = canvas.getContext('2d');

        // Draw background grey
        ctx.fillStyle = "rgb(150,150,150)";
        ctx.fillRect(0,0, canvas.width, canvas.height);

        if (img) {
            ctx.drawImage(img, 0, 0, img.width, img.height);
        }
    }

    render() {
        return (
            <canvas ref="canvas" width={300} height={300}/>
        );
    }
}

export default ImageCanvas
