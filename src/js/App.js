import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PlayerNav from './PlayerNav';
import PlayerDialog from './PlayerDialog';
import { Tabs, Tab } from 'react-bootstrap';
import {incrementZ, decrementZ, toggleChannel, setChannelColor, setImage} from './actions'
import ChannelListContainer from './controls/ChannelListContainer'
import { fetchImage } from './actions'
import ImageLink from './ImageLink';


const styles = {
    dialog: {
        width: '375px',
        top: '45px',
        position: 'absolute',
        right: '20px',
    },
    modalBody: {
        padding: '0',
    }
}

// Pure functional component is single render() function
// passed the props via de-structuring
// We only want props.params so...
const App = ({ params }) => (
    <div>
        <PlayerNav></PlayerNav>
        <div>
            <ImageLink imageId="4420">
                Image 4420
            </ImageLink>
            |
            <ImageLink imageId="3731">
                Image 3731
            </ImageLink>
        </div>
        <PlayerDialog/>
        <div style={styles.dialog} className='modal-dialog'>
            <div className='modal-content'>
                <div style={styles.modalBody} className='modal-body'>
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title={'Image:' + params.imageId}>
                            <ChannelListContainer
                                imageId={params.imageId}
                            />
                        </Tab>
                        <Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>
                        <Tab eventKey={3} title="Tab 3">Tab 3 content</Tab>
                    </Tabs>
                </div>
                <div className='modal-footer'>
                    Footer
                </div>
            </div>
        </div>
    </div>
);

export default App
