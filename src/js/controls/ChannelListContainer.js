
import { connect } from 'react-redux'
import ChannelList from './ChannelList'
import {toggleChannel } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    // active: ownProps.filter === state.visibilityFilter
    channels: state.channels
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChannelClick: (idx) => {
      dispatch(toggleChannel(idx))
    }
  }
}

const ChannelListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelList)

export default ChannelListContainer
