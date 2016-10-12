
import React, { Component, PropTypes } from 'react';

const styles = {
	sliderContainer: {
        position: 'relative',
        backgroundColor: '#ddd',
        borderRadius: '3px',
        top: '32px',
    },
    slider: {
    	backgroundColor: 'transparent',
    	position: 'relative',
    	zIndex: 10,
    	opacity: 0.7,
    }
}

const TSlider = ({theT, sizeT, setT, planes, offset}) => (
	<div style={styles.sliderContainer}>
        {planes.map((p) => (
          <div key={p} className='tSliderBg' style={{ left: p * offset + 'px', width: offset + 'px'}}></div>
        ))}
        <input
          type='range'
          value={theT}
          min='0' max={sizeT -1}
          onMouseUp={(event) => {setT(event.target.value)}}
          onChange={(event) => {setT(event.target.value, true)}}
          style={styles.slider}
        ></input>
    </div>
)

TSlider.propTypes = {
    theT: PropTypes.number.isRequired,
    sizeT: PropTypes.number.isRequired,
    setT: PropTypes.func.isRequired,
    planes: PropTypes.array.isRequired,
    offset: PropTypes.number.isRequired
}

export default TSlider
