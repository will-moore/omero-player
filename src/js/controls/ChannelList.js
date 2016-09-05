import React, { PropTypes } from 'react'
import Channel from './Channel'

const ChannelList = ({ channels, onChannelClick }) => (
  <ul>
    {channels.map(channel =>
      <Channel
        key={channel.id}
        {...channel}
        onClick={() => onChannelClick(channel.id)}
      />
    )}
  </ul>
)

ChannelList.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onChannelClick: PropTypes.func.isRequired
}

export default ChannelList