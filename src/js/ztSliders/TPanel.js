
import React, { Component } from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';


const styles = {
    dialog: {
        width: '100%',
        bottom: '15px',
        position: 'absolute',
        left: '0',
        marginLeft: '50%',
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

const TPanel = React.createClass({

    getInitialState() {
      return {'playing': false}
    },

    toggleMovie() {
      this.props.toggleMovie();
      // timeout to allow state to update
      setTimeout(this.nextFrame, 0);
    },

    nextFrame() {
      if (!this.props.isPlayingMovie) {
        return;
      }
      this.props.incrementT();
      setTimeout(this.nextFrame, 1000);
    },

    render () {
      let planes = this.props.loadedTPlanes;
      let offset = 378/this.props.sizeT;
      let playing
      return (
          <div style={styles.dialog} className='modal-dialog'>
            <div style={styles.modalBody} className='modal-content'>
              <div style={styles.tlabel} >
                {this.props.theT + 1} / {this.props.sizeT}
              </div>

              <ButtonGroup style={styles.btnGroup} >
                <Button
                  style={styles.btn}
                  onClick={this.props.decrementT}
                  bsSize="large"
                  bsStyle="link"
                ><Glyphicon glyph="backward" /></Button>

                <Button
                  style={styles.btn}
                  onClick={this.toggleMovie}
                  bsSize="large"
                  bsStyle="link"
                >
                {this.props.isPlayingMovie ? <Glyphicon glyph="pause" /> : <Glyphicon glyph="play" />}
                </Button>

                <Button
                  style={styles.btn}
                  onClick={this.props.incrementT}
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
                  value={this.props.theT}
                  min='0' max={this.props.sizeT -1}
                  onMouseUp={(event) => {this.props.setT(event.target.value)}}
                  onInput={(event) => {this.props.setT(event.target.value, true)}}
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

export default TPanel