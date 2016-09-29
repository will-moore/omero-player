
import React, { PropTypes } from 'react'

class ImageCanvas extends React.Component {
    componentWillReceiveProps(nextProps) {
        console.log('props', nextProps);
        if (nextProps.channels !== this.props.channels) {
            this.updateCanvas();
        }
    }
    componentDidMount() {
        // Start listening for window resize events...
        window.addEventListener('resize', this.updateCanvas.bind(this));
        // Do an initial render of canvas
        this.updateCanvas();
    }
    updateCanvas() {
        const canvas = this.refs.canvas;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 50;
        const ctx = canvas.getContext('2d');

        // Draw background grey
        ctx.fillStyle = "rgb(150,150,150)";
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }
    render() {
        return (
            <canvas ref="canvas" width={300} height={300}/>
        );
    }
}

export default ImageCanvas
