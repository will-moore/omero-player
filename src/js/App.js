import React, { Component } from 'react';
import PlayerNav from './navbar/PlayerNav';
import RightPanel from './controls/RightPanel'
import ImageCanvasContainer from './canvas/ImageCanvasContainer'
import GridContainer from './canvas/GridContainer'
import ZPanelContainer from './ztSliders/ZPanelContainer'
import TPanelContainer from './ztSliders/TPanelContainer'
import { connect } from 'react-redux'
import PlaneManager from './pixelData/PlaneManager'

// Pure functional component is single render() function
// passed the props via de-structuring
// We only want props.params so...
const App = ({ params, planeManager }) => (
    <div>
        <PlayerNav></PlayerNav>

        <GridContainer planeManager={planeManager} />
        <ImageCanvasContainer planeManager={planeManager} />
        <RightPanel
            imageId = {params.imageId}
        ></RightPanel>
        <ZPanelContainer></ZPanelContainer>
        <TPanelContainer></TPanelContainer>
    </div>
);


const mapStateToProps = (state, ownProps) => {
  return {
    params: ownProps.params,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    planeManager: PlaneManager(dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
