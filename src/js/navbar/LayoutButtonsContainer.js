
import { connect } from 'react-redux'
import LayoutButtons from './LayoutButtons'
import { setLayout } from '../actions'

// Define how state from store gets mapped to
// props of child component
const mapStateToProps = (state, ownProps) => {
  return {
    layout: state.layout
  }
}

const LayoutButtonsContainer = connect(
  mapStateToProps,
  {setLayout: setLayout}
)(LayoutButtons)

export default LayoutButtonsContainer
