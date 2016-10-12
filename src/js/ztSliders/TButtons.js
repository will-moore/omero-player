
import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';

const styles = {
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
}

const TButtons = ({incrementT, decrementT, isPlayingMovie, togglePlay}) => (

    <ButtonGroup style={styles.btnGroup} >
        <Button
          style={styles.btn}
          onClick={decrementT}
          bsSize="large"
          bsStyle="link"
        ><Glyphicon glyph="backward" /></Button>

        <Button
          style={styles.btn}
          onClick={togglePlay}
          bsSize="large"
          bsStyle="link"
        >
            {isPlayingMovie ? <Glyphicon glyph="pause" /> : <Glyphicon glyph="play" />}
        </Button>

        <Button
          style={styles.btn}
          onClick={incrementT}
          bsSize="large"
          bsStyle="link"
        ><Glyphicon glyph="forward" /></Button>
    </ButtonGroup>
)

TButtons.propTypes = {
    incrementT: PropTypes.func.isRequired,
    decrementT: PropTypes.func.isRequired,
    isPlayingMovie: PropTypes.bool.isRequired,
    togglePlay: PropTypes.func.isRequired
}

export default TButtons
