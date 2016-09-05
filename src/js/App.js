import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import PlayerNav from './PlayerNav';
import PlayerDialog from './PlayerDialog';
import { Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import playerApp from './reducers';
import {incrementZ, decrementZ, toggleChannel, setChannelColor, setImage} from './actions'
import { createStore } from 'redux';
import ChannelList from './controls/ChannelList'


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

    componentDidMount() {

        let store = createStore(playerApp);
        console.log(store.getState());

        let unsubscribe = store.subscribe(() => {
            console.log('subscribe', store.getState())
            this.setState({'channels': store.getState().channels});
        })

        // store.dispatch(incrementZ());
        // store.dispatch(decrementZ());

        // store.dispatch(toggleChannel(1));
        // store.dispatch(toggleChannel(2));
        // store.dispatch(toggleChannel(1));

        // store.dispatch(setChannelColor(0, 'FFFFFF'));

        axios.get('/webgateway/imgData/3728/').then(function(rsp){
            console.log(rsp.data);
            let theT = rsp.data.rdefs.defaultT;
            let channels = rsp.data.channels.map((channel, idx) => {
                return {active: channel.active,
                        color: channel.color,
                        id: idx}
            })
            store.dispatch(setImage(theT, channels));
        });
    }

    handleChannelClick() {
        console.log('handleChannelClick', arguments);
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
                                <ChannelList
                                    channels={this.state.channels}
                                    onChannelClick={this.handleChannelClick}>
                                </ChannelList>
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