
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';


const styles = {
    dialog: {
        width: '100px',
        top: '45px',
        position: 'absolute',
        left: '20px',
    },
    modalBody: {
        padding: '0',
    }
}

const ZPanel = ({ incrementZ, decrementZ, theZ }) => (
  <div style={styles.dialog} className='modal-dialog'>
    Z: {theZ}
    <Button
      onClick={incrementZ}
      bsSize="small"
    >+</Button>
    <Button
      onClick={decrementZ}
      bsSize="small"
    >-</Button>
  </div>
)

// ZPanel.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   active: PropTypes.bool.isRequired,
//   color: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired
// }

export default ZPanel