
import React from 'react';


const GridPlane = React.createClass({

	componentDidAppear() {
		console.log('componentDidAppear...')
	},

	componentDidEnter() {
		console.log('...componentDidEnter')
	},

	render() {

		return (
			<div
				style={{ width: this.props.sizeX, height: this.props.sizeY,
                    top: -this.props.sizeY/2, left: -this.props.sizeX/2,
                    position: 'absolute',
                    border: 'solid blue 1px',
                    transform: 'perspective(500px) translateZ(-200px) translate(' + (105 * (this.props.Tindex - this.props.theT)) + '%, ' + (105 * (this.props.theZ - this.props.Zindex)) + '%)'}}

			>
			{ "Z:" + this.props.Zindex + " T:" + this.props.Tindex }
			</div>
		)
	}
})

export default GridPlane
