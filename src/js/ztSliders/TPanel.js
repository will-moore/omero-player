
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
}

const TPanel = React.createClass({

    getInitialState() {
      return {'playing': false}
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
      this.props.incrementT();
      setTimeout(this.nextFrame, 1000);
    },

    handleMouseWheel(e) {
      e.preventDefault();
      console.log(e.nativeEvent.deltaY);
      let delta = e.nativeEvent.deltaY;
      if (delta > 0) {
        this.props.incrementT();
      } else if (delta < 0) {
        this.props.decrementT();
      }
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

// TPanel.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   active: PropTypes.bool.isRequired,
//   color: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired
// }

export default TPanel