
import React from 'react';
import {findDOMNode} from 'react-dom'

const GridPlane = React.createClass({

	getInitialState() {
		return {'loaded': false}
	},

	componentDidMount() {
        this.drawPlane();
    },


	componentDidUpdate(nextProps, nextState) {
		// Don't redraw plane if it's aready loaded
		if (this.state.loaded) {
			return;
		}
        this.drawPlane();
    },

	drawPlane() {
		console.trace('GridPlane drawPlane()')
        // Do an initial render of canvas
        // We use a key 'z,t' to check if plane is already loaded...
        const key = `${ this.props.Zindex },${ this.props.Tindex }`;
        // if (this.props.loadedPlanes.indexOf(key) > -1) {
            // ...plane is loaded, we can get it and draw on canvas
            console.log('zt', this.props.Zindex, this.props.Tindex);
            const source = this.props.planeManager.getImgAndCoords(this.props.Zindex, this.props.Tindex);
            if (source) {
                let img = source.img;
                this.updateCanvas(img);
            } else {
                console.log("NOT FOUND", this.props.Zindex, this.props.Tindex);
                return;
            }
        // }
    },

    updateCanvas(img) {
    	this.setState({'loaded': true});
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        if (img) {
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
        }
    },

	componentDidEnter() {
		const el = findDOMNode(this);

		let transZ = 0
		let translate = ' translate(' + (105 * (this.props.Tindex - this.props.theT)) + '%, ' + (105 * (this.props.theZ - this.props.Zindex)) + '%)'
		// start zoomed out
		el.style.transform = `perspective(500px) translateZ(${transZ}) ${translate}`
		// add transition keyframes
		el.className = "gridPlane"
		// zoom in
		transZ = '-500px'
		el.style.transform = `perspective(500px) translateZ(${transZ}) ${translate}`
		el.className = ""
	},

	componentWillLeave(callback) {
		const el = findDOMNode(this);

		let transZ = '-500px'
		let translate = ' translate(' + (105 * (this.props.Tindex - this.props.theT)) + '%, ' + (105 * (this.props.theZ - this.props.Zindex)) + '%)'
		// start zoomed in
		el.style.transform = `perspective(500px) translateZ(${transZ}) ${translate}`
		// add transition keyframes
		el.className = "gridPlane"
		// zoom in
		transZ = 0
		el.style.transform = `perspective(500px) translateZ(${transZ}) ${translate}`
		callback();
	},

	render() {

		return (
			<div
				style={{ width: this.props.sizeX, height: this.props.sizeY,
                    top: -this.props.sizeY/2, left: -this.props.sizeX/2,
                    position: 'absolute',
                    background: '#eee',
                    transform: 'perspective(500px) translateZ(-500px) translate(' + (105 * (this.props.Tindex - this.props.theT)) + '%, ' + (105 * (this.props.theZ - this.props.Zindex)) + '%)'}}

			>
            	<canvas ref="canvas" width={this.props.sizeX} height={this.props.sizeY}/>
			</div>
		)
	}
})

export default GridPlane
