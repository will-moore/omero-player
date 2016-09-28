import React, { Component } from 'react';
import PlayerNav from './PlayerNav';
import RightPanel from './controls/RightPanel'
import ImageCanvas from './canvas/ImageCanvas'

// Pure functional component is single render() function
// passed the props via de-structuring
// We only want props.params so...
const App = ({ params }) => (
    <div>
        <PlayerNav></PlayerNav>
        <ImageCanvas></ImageCanvas>
        <RightPanel
            imageId = {params.imageId}
        ></RightPanel>
    </div>
);

export default App
