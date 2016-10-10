
import React, { Component } from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';


const styles = {
    dialog: {
        width: '100%',
        height: 0,
        top: '50%',
        position: 'absolute',
        left: '0',
        marginLeft: '200px',
    },
    modalBody: {
        padding: '0',
        position: 'relative',
        width: 65,
        height: 400,
        top: -200,
        left: 0,
        padding: '10px',
        backgroundColor: 'rgba(100,100,100,0.7)',
    },
    sliderContainer: {
        position: 'relative',
        backgroundColor: '#ddd',
        borderRadius: '3px',
        top: 32,
        transform: 'rotate(-90deg)',
        transformOrigin: 'right',
        width: 300,
        top: 20,
        right: 281,
    },
    slider: {
      backgroundColor: 'transparent',
      position: 'relative',
      zIndex: 10,
      opacity: 0.7,
      width: 300,
    },
    btn: {
      color: '#eee',
      fontSize: '20px',
      outline: 'none',
      padding: '0px 9px',
      flexGrow: '1',
      position: 'absolute',
      transform: 'rotate(-90deg)',
      transformOrigin: 'centre',
    },
    tlabel: {
      marginBottom: 6,
      marginLeft: -10,
      width: '100%',
      textAlign: 'center',
      color: '#eee',
      position: 'absolute',
      bottom: 0,
    },
}

const a = Object.assign;

const ZPanel = React.createClass({

    render () {
      if (this.props.sizeZ === 1) {
        return <span></span>
      }
      let planes = this.props.loadedZPlanes;
      let offset = styles.sliderContainer.width/this.props.sizeZ;
      return (
          <div style={styles.dialog} className='modal-dialog'>
            <div style={styles.modalBody} className='modal-content'>
              <div style={styles.tlabel} >
                {this.props.theZ + 1} / {this.props.sizeZ}
              </div>

                <Button
                  style={a({}, styles.btn, {'bottom': 25})}
                  onClick={this.props.decrementZ}
                  bsSize="large"
                  bsStyle="link"
                ><Glyphicon glyph="backward" /></Button>

                <Button
                  style={styles.btn}
                  onClick={this.props.incrementZ}
                  bsSize="large"
                  bsStyle="link"
                ><Glyphicon glyph="forward" /></Button>

              <div style={styles.sliderContainer}>
                {planes.map((p) => (
                  <div key={p} className='tSliderBg' style={{ left: p * offset + 'px', width: offset + 'px'}}></div>
                ))}
                <input
                  type='range'
                  value={this.props.theZ}
                  min='0' max={this.props.sizeZ -1}
                  onMouseUp={(event) => {this.props.setZ(event.target.value)}}
                  onInput={(event) => {this.props.setZ(event.target.value, true)}}
                  style={styles.slider}
                ></input>
              </div>
            </div>
          </div>
      )
    }
})

// TPanel.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   active: PropTypes.bool.isRequired,
//   color: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired
// }

export default ZPanel