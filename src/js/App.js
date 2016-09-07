import React, { Component } from 'react';
import PlayerNav from './PlayerNav';
import PlayerDialog from './PlayerDialog';
import { Tabs, Tab } from 'react-bootstrap';
import {incrementZ, decrementZ, toggleChannel, setChannelColor, setImage} from './actions'
import ChannelListContainer from './controls/ChannelListContainer'


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

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            channels: []
        };
        console.log('constructor', this, this.state);
    }



  render() {
    console.log('render', this.state, this.state.channels);
    return (
        <div>
            <PlayerNav></PlayerNav>
            <div>Content</div>
            <PlayerDialog/>
            <div style={styles.dialog} className='modal-dialog'>
                <div className='modal-content'>
                    <div style={styles.modalBody} className='modal-body'>
                        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                            <Tab eventKey={1} title="Tab 1">
                                <ChannelListContainer />
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
  }
}