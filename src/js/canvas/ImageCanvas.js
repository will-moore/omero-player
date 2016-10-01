
import React, { PropTypes } from 'react'

class ImageCanvas extends React.Component {
    componentWillReceiveProps(nextProps) {
        console.log('props', nextProps);
        if (nextProps.channels !== this.props.channels) {
            this.updateCanvas();
        }
    }
    componentDidUpdate(nextProps, nextState) {
        console.log('componentDidUpdate');
        // this.updateCanvas();
        if (this.props.channels.length > 0) {
            // const src = this.getImgSrc();
            // console.log("SRC", src);
            // this.img.src = src;
            const iid = this.props.imageId;
            this.props.planeManager.loadPlane(iid, 0, 1, this.props.channels);
        }
    }

    getImgSrc() {
        const chs = this.props.channels.map((c, idx) => {

            if (!c.active) return "";
            const wStart = 5, wEnd = 200;
            return `${idx + 1}|${wStart}:${wEnd}$${c.color}`
        });
        const imgId = this.props.imageId;
        return `/webgateway/render_image/${ imgId }/?c=${ chs.join(',') }`;
    }

    componentDidMount() {
        // this.PlaneManager = PlaneManager(this.props);

        // this.img = new Image();
        // this.img.onload = function() {
        //     console.log("LOADED");
        //     this.updateCanvas(true);
        // }.bind(this);


        // Start listening for window resize events...
        window.addEventListener('resize', this.updateCanvas.bind(this));
        // Do an initial render of canvas
        this.updateCanvas();
    }

    updateCanvas(data) {
        console.log('updateCanvas', this.props.channels);

        const canvas = this.refs.canvas;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 50;
        const ctx = canvas.getContext('2d');

        // Draw background grey
        ctx.fillStyle = "rgb(150,150,150)";
        ctx.fillRect(0,0, canvas.width, canvas.height);

        if (data) {
            const i = this.img;
            ctx.drawImage(i, 0, 0, i.width, i.height);
        }
    }
    render() {
        return (
            <canvas ref="canvas" width={300} height={300}/>
        );
    }
}

export default ImageCanvas
