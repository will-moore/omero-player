
import React, { PropTypes } from 'react'
import { Layouts } from '../actions'

class ImageCanvas extends React.Component {

    componentDidUpdate(nextProps, nextState) {
        this.loadOrDrawPlane();
    }

    componentDidMount() {
        // Start listening for window resize events...
        window.addEventListener('resize', this.loadOrDrawPlane.bind(this));
        // Do an initial render of canvas
        this.loadOrDrawPlane();
    }

    loadOrDrawPlane() {
        console.log("loadOrDrawPlane...")
        // If we have image data loaded...
        let img;
        if (this.props.channels.length > 0) {
            // We use a key 'z,t' to check if plane is already loaded...
            const key = `${ this.props.theZ },${ this.props.theT }`;
            if (this.props.loadedPlanes.indexOf(key) === -1) {
                // if plane is not loaded, load it...
                if (this.props.sliding) {
                    // but if we're sliding Z/T sliders, don't load plane that's not loaded
                    return;
                }
                this.props.planeManager.loadPlane(this.props.imageId, this.props.theZ,
                                                  this.props.theT, this.props.channels);
                return;
            } else {
                // ...otherwise, plane is loaded, we can get it and draw on canvas
                const source = this.props.planeManager.getImgAndCoords(this.props.theZ, this.props.theT);
                if (source) {
                    img = source.img;
                    this.updateCanvas(img);
                } else {
                    console.log("NOT FOUND", this.props.theZ, this.props.theT);
                    return;
                }
            }
        }
    }

    updateCanvas(img) {
        const canvas = this.refs.canvas;
        if (!canvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 50;
        const ctx = canvas.getContext('2d');

        // Draw background grey
        ctx.fillStyle = "rgb(150,150,150)";
        ctx.fillRect(0,0, canvas.width, canvas.height);

        if (img) {
            const xOffset = (canvas.width - img.width) / 2;
            const yOffset = (canvas.height - img.height) / 2;
            ctx.drawImage(img, 0, 0, img.width, img.height, xOffset, yOffset, img.width, img.height);
        }
    }

    render() {
        console.log(this.props.layout, Layouts.FULL_VIEWER)
        if (this.props.layout !== Layouts.FULL_VIEWER) {
            return <span/>
        }
        return (
            <canvas ref="canvas" width={300} height={300}/>
        );
    }
}

export default ImageCanvas
