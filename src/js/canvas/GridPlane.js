
import React from 'react';
import {findDOMNode} from 'react-dom'

const GridPlane = React.createClass({

	// componentDidAppear() {
	// 	console.log('componentDidAppear...')
	// },

	componentDidEnter() {
		console.log('...componentDidEnter')
		const el = findDOMNode(this);

		let transZ = 0
		let translate = ' translate(' + (105 * (this.props.Tindex - this.props.theT)) + '%, ' + (105 * (this.props.theZ - this.props.Zindex)) + '%)'
		
		// start zoomed out
		el.style.transform = `perspective(500px) translateZ(${transZ}) ${translate}`
		// add transition keyframes
		el.className = "gridPlane"
		// zoom in
		transZ = '-500px'
		// el.style.transform = `perspective(500px) translateZ(${transZ}) ${translate}`
		setTimeout(() => {
			console.log('1000...')
			el.style.transform = `perspective(500px) translateZ(${transZ}) ${translate}`
			// callback();
		}, 0)
	},

	render() {

		return (
			<div
				style={{ width: this.props.sizeX, height: this.props.sizeY,
                    top: -this.props.sizeY/2, left: -this.props.sizeX/2,
                    position: 'absolute',
                    border: 'solid blue 1px',
                    transform: 'perspective(500px) translateZ(-500px) translate(' + (105 * (this.props.Tindex - this.props.theT)) + '%, ' + (105 * (this.props.theZ - this.props.Zindex)) + '%)'}}

			>
			{ "Z:" + this.props.Zindex + " T:" + this.props.Tindex }
			</div>
		)
	}
})

export default GridPlane
