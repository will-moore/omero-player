
import { connect } from 'react-redux'
import TPanel from './TPanel'
import { setT, incrementT, decrementT, toggleMovie } from '../actions'


const getLoadedTPlanes = (theZ, loadedPlanes) => {
  let p = loadedPlanes.reduce((prev, zt) => {
    let [z, t] = zt.split(',');
    // compare string 'z' to integer theZ (type coercion)
    if (z == theZ) {
      prev.push(parseInt(t));
    }
    return prev;
  }, []);
  return p;
}

const mapStateToProps = (state, ownProps) => {
  return {
    theT: state.theT,
    sizeT: state.sizeT,
    loadedTPlanes: getLoadedTPlanes(state.theZ, state.loadedPlanes),
    isPlayingMovie: state.isPlayingMovie,
    theZ: state.theZ,
  }
}

const TPanelContainer = connect(
  mapStateToProps,
  {setT: setT,
   incrementT: incrementT,
   decrementT: decrementT,
   toggleMovie: toggleMovie,
  }
)(TPanel)

export default TPanelContainer
