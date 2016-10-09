
import { connect } from 'react-redux'
import ZPanel from './ZPanel'
import { setZ, incrementZ, decrementZ } from '../actions'


const getLoadedZPlanes = (theT, loadedPlanes) => {
  let p = loadedPlanes.reduce((prev, zt) => {
    let [z, t] = zt.split(',');
    // compare string 't' to integer theT (type coercion)
    if (t == theT) {
      prev.push(parseInt(z));
    }
    return prev;
  }, []);
  return p;
}

const mapStateToProps = (state, ownProps) => {
  return {
    theT: state.theT,
    sizeZ: state.sizeZ,
    loadedZPlanes: getLoadedZPlanes(state.theT, state.loadedPlanes),
    // isPlayingMovie: state.isPlayingMovie,
    theZ: state.theZ,
  }
}

const ZPanelContainer = connect(
  mapStateToProps,
  {setZ: setZ,
   incrementZ: incrementZ,
   decrementZ: decrementZ,
   // toggleMovie: toggleMovie,
  }
)(ZPanel)

export default ZPanelContainer
