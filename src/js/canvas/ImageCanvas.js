
import React, { PropTypes } from 'react'
import { Layouts } from '../actions'

class ImageCanvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dx: 0,
            dy: 0,
        };
    }

    componentDidUpdate(nextProps, nextState) {
        // If we've JUST cleared the store's loadedPlanes, we also need to
        // clear the planeManager's list of cached images.
        if (this.props.loadedPlanes.length === 0) {
            this.props.planeManager.clearPlanes();
        }
        this.loadOrDrawPlane();
    }

    componentDidMount() {
        // Start listening for window resize events...
        window.addEventListener('resize', this.loadOrDrawPlane.bind(this));
        // Do an initial render of canvas
        this.loadOrDrawPlane();
    }

    // Load the current plane. As part of a batch of stitched planes.
    loadCurrentPlane() {
        let batchSize = 5;      // or use 1 to load single plane
        let theT = this.props.theT,
            theZ = this.props.theZ;
        let tStart = theT,
            tEnd = theT + 1,
            zStart = theZ,
            zEnd = theZ + 1;
        if (this.props.sizeT > 1) {
            // load planes along T axis...
            let tSlice = parseInt(theT/batchSize, 10);
            tStart = batchSize * tSlice;
            tEnd = Math.min(this.props.sizeT, (tSlice + 1) * batchSize);
        } else {
            let zSlice = parseInt(theZ/batchSize, 10);
            zStart = batchSize * zSlice;
            zEnd = Math.min(this.props.sizeZ, (zSlice + 1) * batchSize);
        }
        this.props.planeManager.loadPlane(this.props.imageId, zStart, zEnd,
                                          tStart, tEnd, this.props.channels);
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
                this.loadCurrentPlane();
                return;
            } else {
                // ...otherwise, plane is loaded, we can get it and draw on canvas
                const source = this.props.planeManager.getImgAndCoords(this.props.theZ,
                                                                       this.props.theT);
                if (source) {
                    img = source.img;
                    // planes stitched across x axis
                    let xOffset = source.x * this.props.sizeX;
                    this.updateCanvas(img, xOffset);
                } else {
                    console.log("NOT FOUND", this.props.theZ, this.props.theT);
                    return;
                }
            }
        }
    }

    updateCanvas(img, srcX) {
        const canvas = this.refs.canvas;
        if (!canvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 50;
        const ctx = canvas.getContext('2d');

        // Draw background grey
        ctx.fillStyle = "rgb(150,150,150)";
        ctx.fillRect(0,0, canvas.width, canvas.height);

        let imgWidth = this.props.sizeX * this.props.zoom/100
        let imgHeight = img.height * this.props.zoom/100
        if (img) {
            const xOffset = ((canvas.width - imgWidth) / 2) + this.state.dx;
            const yOffset = ((canvas.height - imgHeight) / 2) + this.state.dy;
            ctx.drawImage(img, srcX, 0, this.props.sizeX, img.height, xOffset, yOffset, imgWidth, imgHeight);
        }
    }

    handleMouseWheel(e) {
      e.preventDefault();
      let delta = e.nativeEvent.deltaY;
      this.props.setZoom(this.props.zoom + delta);
    }

    // Implement drag behaviour
    onMouseDown(e) {
        this.mouseDown = true;
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }
    onMouseUp(e) {
        this.mouseDown = false;
    }
    onMouseMove(e) {
        if (this.mouseDown) {
            let dx = e.clientX - this.mouseX;
            let dy = e.clientY - this.mouseY;
            this.setState({dx: this.state.dx + dx, dy: this.state.dy + dy});
            // reset so we can calculate dx and dy next time
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        }
    }

    render() {
        console.log(this.props.layout, Layouts.FULL_VIEWER)
        if (this.props.layout !== Layouts.FULL_VIEWER) {
            return <span/>
        }
        return (
            <canvas ref="canvas" width={300} height={300}
                onWheel={this.handleMouseWheel.bind(this)}
                onMouseDown={this.onMouseDown.bind(this)}
                onMouseUp={this.onMouseUp.bind(this)}
                onMouseMove={this.onMouseMove.bind(this)}
            />
        );
    }
}

export default ImageCanvas
