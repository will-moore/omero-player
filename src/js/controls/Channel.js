
import React, { PropTypes } from 'react'

const Channel = ({ onClick, active, color }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: active ? 'line-through' : 'none'
    }}
  >
    {color}
  </li>
)

Channel.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired
}

export default Channel