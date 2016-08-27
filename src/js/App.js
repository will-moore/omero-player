import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import PlayerNav from './PlayerNav';

export default class App extends Component {
  render() {
    return (
        <div>
            <PlayerNav></PlayerNav>
            <div>Content</div>
        </div>
    );
  }
}