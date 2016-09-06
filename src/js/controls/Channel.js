
import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap';

const Channel = ({ onClick, active, color, label }) => (
  <div
    onClick={onClick}
    style={{
      textDecoration: active ? 'line-through' : 'none',
    }}
  >
    <Button
      bsSize="small"
      style={{
      'backgroundColor': '#' + color,
      'opacity': active ? '1' : '0.5',
    }}
    >{label}</Button>
  </div>
)

Channel.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default Channel