
import { connect } from 'react-redux'
import ChannelList from './ChannelList'
import {toggleChannel, fetchImage } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    // active: ownProps.filter === state.visibilityFilter
    channels: state.channels
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('ownProps', ownProps);
  return {
    onChannelClick: (idx) => {
      dispatch(toggleChannel(idx))
    },

    fetchImage: (imageId) => {
      dispatch(fetchImage(imageId))
    },

    imageId: ownProps.imageId
  }
}

const ChannelListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelList)

export default ChannelListContainer
