
import { connect } from 'react-redux'
import ZPanel from './ZPanel'
import {incrementZ, decrementZ } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    theZ: state.theZ,
  }
}

const ZPanelContainer = connect(
  mapStateToProps,
  {incrementZ: incrementZ,
   decrementZ: decrementZ}
)(ZPanel)

export default ZPanelContainer
