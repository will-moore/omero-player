
import React from 'react';
import { Navbar, Nav, Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import { Layouts } from '../actions'


const LayoutButtons = ({setLayout, layout}) => (
	<form className="navbar-form navbar-right">
        <ButtonGroup>
          <Button bsStyle="link"
          		onClick={() => {setLayout(Layouts.FULL_VIEWER)} }>
          	<Glyphicon glyph="blackboard" />
          </Button>
          <Button bsStyle="link"
          		onClick={() => {setLayout(Layouts.GRID_LAYOUT)} }>
          	<Glyphicon glyph="th" />
          </Button>
        </ButtonGroup>
    </form>
)


export default LayoutButtons
