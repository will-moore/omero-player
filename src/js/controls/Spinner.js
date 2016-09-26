
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const styles = {
    spinner: {
        position: 'fixed',
        right: '10px',
        top: '10px',
        color: 'white',
        fontSize: '30px',
        animation: 'spin 2s linear infinite',
    }
}

const SpinnerIcon = ({ isFetching }) => (
  <span style={styles.spinner}>
    <span
      style={{visibility: isFetching ? 'visible' : 'hidden'}}
      className="pull-right glyphicon glyphicon-refresh"
      >
    </span>
  </span>
)

SpinnerIcon.propTypes = {
  isFetching: PropTypes.bool.isRequired
}


const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.isFetching,
  }
}

const Spinner = connect(
  mapStateToProps
)(SpinnerIcon)

export default Spinner
