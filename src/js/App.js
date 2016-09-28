import React, { Component } from 'react';
import PlayerNav from './PlayerNav';
import RightPanel from './controls/RightPanel'

// Pure functional component is single render() function
// passed the props via de-structuring
// We only want props.params so...
const App = ({ params }) => (
    <div>
        <PlayerNav></PlayerNav>
        <RightPanel
            imageId = {params.imageId}
        ></RightPanel>
    </div>
);

export default App
