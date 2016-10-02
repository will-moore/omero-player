
import { connect } from 'react-redux'
import TPanel from './TPanel'
import { setT } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    theT: state.theT,
  }
}

const TPanelContainer = connect(
  mapStateToProps,
  {setT: setT}
)(TPanel)

export default TPanelContainer
