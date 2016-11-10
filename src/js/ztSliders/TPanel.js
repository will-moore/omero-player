
import React, { Component } from 'react';
import TButtons from './TButtons';
import TSlider from './TSlider';

const styles = {
    dialog: {
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
    tlabel: {
      marginTop: '6px',
      color: '#eee',
      position: 'absolute'
    },
    fps: {
      marginTop: 3,
      color: '#eee',
      position: 'absolute',
      right: 12,
    },
    fpsInput: {
      width: 40,
      backgroundColor: 'transparent',
      border: 'solid #999 1px',
      borderRadius: 3,
      paddingLeft: 4,
      outline: 'none',
      marginRight: 5,
    },
}

const m = Object.assign;

const TPanel = React.createClass({

    getInitialState() {
      return {'playing': false, 'fps': 1}
    },

    togglePlaying() {
      this.props.toggleMovie();
      // timeout to allow state to update
      setTimeout(this.nextFrame, 0);
    },

    nextFrame() {
      if (!this.props.isPlayingMovie) {
        return;
      }
      if ((this.props.theT + 1) === this.props.sizeT) {
        this.props.setT(0);
      } else {
        this.props.incrementT();
      }
      var time = parseInt(1000/this.state.fps, 10);
      setTimeout(this.nextFrame, time);
    },

    handleMouseWheel(e) {
      e.preventDefault();
      let delta = e.nativeEvent.deltaY;
      if (delta > 0) {
        this.props.incrementT();
      } else if (delta < 0) {
        this.props.decrementT();
      }
    },

    fpsChange(e) {
      this.setState({'fps': e.nativeEvent.srcElement.valueAsNumber});
    },

    render () {
      if (this.props.sizeT === 1) {
        return <span></span>
      }
      return (
          <div style={styles.dialog} className='modal-dialog'>
            <div style={styles.modalBody} className='modal-content' onWheel={this.handleMouseWheel} >
              <div style={styles.tlabel} >
                {this.props.theT + 1} / {this.props.sizeT}
              </div>

              <div style={m(styles.fps, {visibility: this.props.isPlayingMovie ? 'visible' : 'hidden'})}>
                <input style={styles.fpsInput} type='number'
                  min='0'
                  max='50'
                  defaultValue={this.state.fps}
                  onChange={this.fpsChange}
                />
                fps
              </div>

              <TButtons
                incrementT={this.props.incrementT}
                decrementT={this.props.decrementT}
                isPlayingMovie={this.props.isPlayingMovie}
                togglePlay={this.togglePlaying}
              ></TButtons>

              <TSlider
                theT={this.props.theT}
                sizeT={this.props.sizeT}
                setT={this.props.setT}
                planes={this.props.loadedTPlanes}
                offset={378/this.props.sizeT}
              ></TSlider>
            </div>
          </div>
      )
    }
})

export default TPanel