
import React, { Component } from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';


const styles = {
    dialog: {
        width: '100%',
        bottom: '15px',
        position: 'absolute',
        left: '0',
        marginLeft: '200px',
    },
    modalBody: {
        padding: '0',
        position: 'relative',
        width: '400px',
        height: '75px',
        left: '-200px',
        padding: '10px',
        backgroundColor: 'rgba(100,100,100,0.7)',
    },
    sliderContainer: {
        position: 'relative',
        backgroundColor: '#ddd',
        borderRadius: '3px',
        top: '32px',
    },
    btnGroup: {
        position: 'absolute',
        left: '132px',
    },
    btn: {
      color: '#eee',
      fontSize: '20px',
      outline: 'none',
      padding: '5px 12px',
      flexGrow: '1',
    },
    tlabel: {
      marginTop: '6px',
      color: '#eee',
      position: 'absolute'
    },
}

const ZPanel = React.createClass({

    render () {
      let planes = this.props.loadedZPlanes;
      let offset = 378/this.props.sizeZ;
      return (
          <div style={styles.dialog} className='modal-dialog'>
            <div style={styles.modalBody} className='modal-content'>
              <div style={styles.tlabel} >
                {this.props.theZ + 1} / {this.props.sizeZ}
              </div>

              <ButtonGroup style={styles.btnGroup} >
                <Button
                  style={styles.btn}
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
              </ButtonGroup>

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
                  style={{'backgroundColor': 'transparent', 'position': 'relative', 'zIndex': 10, 'opacity': 0.7}}
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