
import { connect } from 'react-redux'
import ImageCanvas from './ImageCanvas'
import PlaneManager from '../pixelData/PlaneManager'
import { setZoom } from '../actions'

// Define how state from store gets mapped to
// props of child component <ImageCanvas>
const mapStateToProps = (state, ownProps) => {
  return {
    layout: state.layout,
    channels: state.channels,
    imageId: state.imageId,
    theZ: state.theZ,
    theT: state.theT,
    sizeZ: state.sizeZ,
    sizeT: state.sizeT,
    sizeX: state.sizeX,
    sliding: state.sliding,
    loadedPlanes: state.loadedPlanes,
    planeManager: ownProps.planeManager,
    zoom: state.zoom,
  }
}

const ImageCanvasContainer = connect(
  mapStateToProps,
  {setZoom: setZoom}
)(ImageCanvas)

export default ImageCanvasContainer
