
import { connect } from 'react-redux'
import ImageCanvas from './ImageCanvas'
import PlaneManager from './PlaneManager'

// Define how state from store gets mapped to
// props of child component <ImageCanvas>
const mapStateToProps = (state, ownProps) => {
  return {
    layout: state.layout,
    channels: state.channels,
    imageId: state.imageId,
    theZ: state.theZ,
    theT: state.theT,
    sliding: state.sliding,
    loadedPlanes: state.loadedPlanes,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    planeManager: PlaneManager(dispatch)
  }
}

const ImageCanvasContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageCanvas)

export default ImageCanvasContainer
