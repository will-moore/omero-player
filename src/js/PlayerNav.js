import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Spinner from './controls/Spinner'

export default class PlayerNav extends Component {

  render() {
    return (
      <Navbar inverse style={{marginBottom: 0, borderRadius: 0}} >
        <Spinner></Spinner>
        <Navbar.Header>
         <Navbar.Brand>
            <a href="#">OMERO.player</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
          </Nav>
          <Nav pullRight>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}