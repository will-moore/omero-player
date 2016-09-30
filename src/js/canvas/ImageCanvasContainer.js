
import { connect } from 'react-redux'
import ImageCanvas from './ImageCanvas'

// Define how state from store gets mapped to
// props of child component <ImageCanvas>
const mapStateToProps = (state, ownProps) => {
  return {
    // we need channels (obviously!)
    channels: state.channels,
    imageId: state.imageId,
  }
}

const ImageCanvasContainer = connect(
  mapStateToProps,
  {}
)(ImageCanvas)

export default ImageCanvasContainer
