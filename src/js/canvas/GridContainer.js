
import { connect } from 'react-redux'
import Grid from './Grid'

// Define how state from store gets mapped to
// props of child component <Grid>
const mapStateToProps = (state, ownProps) => {
  return {
  	layout: state.layout,
    sizeT: state.sizeT,
    sizeZ: state.sizeZ,
    theT: state.theT,
    theZ: state.theZ,
    sizeX: state.sizeX,
    sizeY: state.sizeY,
  }
}

const GridContainer = connect(
  mapStateToProps
)(Grid)

export default GridContainer
