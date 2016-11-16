
import { connect } from 'react-redux'
import ChannelList from './ChannelList'
import {toggleChannel, setChannelWindow, fetchImage } from '../actions'

// Define how state from store gets mapped to
// props of child component <ChannelList>
const mapStateToProps = (state, ownProps) => {
  return {
    // we need channels (obviously!)
    channels: state.channels,

    // imageId is not in the store but is prop of
    // ChannelListContainer.
    // We pass this down to ChannelList so that when it
    // mounts it can do fetchImage(imageId)
    imageId: ownProps.imageId
  }
}

// Define functions that modify store and are
// passed as props of ChannelList so that it
// can update store
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChannelClick: (idx) => {
      dispatch(toggleChannel(idx))
    },

    fetchImage: (imageId) => {
      dispatch(fetchImage(imageId))
    },

    setChannelWindow: (index, window, sliding) => {
      dispatch(setChannelWindow(index, window, sliding))
    }
  }
}

const ChannelListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelList)

export default ChannelListContainer
