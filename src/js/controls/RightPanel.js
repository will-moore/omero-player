
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import ChannelListContainer from './ChannelListContainer'
import ZoomSlider from './ZoomSlider'

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

// We have imageId from url params - Pass down to
// ChannelListContainer so ChannelList can call fetchImage(imageId)
const RightPanel = ({ imageId }) => (

	<div style={styles.dialog} className='modal-dialog'>
        <div className='modal-content'>
            <div style={styles.modalBody} className='modal-body'>
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title={'Channels'}>
                        <ChannelListContainer
                            imageId={imageId}
                        />
                        <ZoomSlider></ZoomSlider>
                    </Tab>
                </Tabs>
            </div>
        </div>
    </div>
);

export default RightPanel
