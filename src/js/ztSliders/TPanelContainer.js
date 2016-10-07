
import { connect } from 'react-redux'
import TPanel from './TPanel'
import { setT, incrementT, decrementT } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    theT: state.theT,
    sizeT: state.sizeT,
    loadedPlanes: state.loadedPlanes,
    theZ: state.theZ,
  }
}

const TPanelContainer = connect(
  mapStateToProps,
  {setT: setT,
   incrementT: incrementT,
   decrementT: decrementT,
  }
)(TPanel)

export default TPanelContainer
