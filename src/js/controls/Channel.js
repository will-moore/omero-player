
import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap';

const Channel = ({ onClick, active, color, label }) => (
  <div
    style={{
      textDecoration: active ? 'line-through' : 'none',
    }}
  >
    <Button
      onClick={onClick}
      bsSize="small"
      style={{
      'outline': '0',
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