import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import PlayerNav from './PlayerNav';
import PlayerDialog from './PlayerDialog';
import { Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';


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

    componentDidMount() {
        
        axios.get('/webgateway/imgData/3728/').then(function(){
            console.log(arguments);
        });
    }

  render() {
    return (
        <div>
            <PlayerNav></PlayerNav>
            <div>Content</div>
            <PlayerDialog/>
            <div style={styles.dialog} className='modal-dialog'>
                <div className='modal-content'>
                    <div style={styles.modalBody} className='modal-body'>
                        <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                            <Tab eventKey={1} title="Tab 1">Tab 1 content</Tab>
                            <Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>
                            <Tab eventKey={3} title="Tab 3" disabled>Tab 3 content</Tab>
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