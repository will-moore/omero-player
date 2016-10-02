
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';


const styles = {
    dialog: {
        width: '100px',
        bottom: '15px',
        position: 'absolute',
        left: '300px',
    },
    modalBody: {
        padding: '0',
    }
}

class TPanel extends React.Component {

    incrementT() {
        this.props.setT(this.props.theT + 1);
    }

    decrementT() {
        this.props.setT(this.props.theT - 1);
    }

    render () {
      return (
          <div style={styles.dialog} className='modal-dialog'>
            <div className='modal-content'>
              T: {this.props.theT}
              <Button
                onClick={this.incrementT.bind(this)}
                bsSize="small"
              >+</Button>
              <Button
                onClick={this.decrementT.bind(this)}
                bsSize="small"
              >-</Button>
            </div>
          </div>
      )
    }
}

// TPanel.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   active: PropTypes.bool.isRequired,
//   color: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired
// }

export default TPanel