
import React, { PropTypes } from 'react'
import { Button, Form, FormGroup} from 'react-bootstrap';

const styles = {
  txt: {
    float: 'left',
    width: 40,
    height: 26,
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 5,
    padding: 5,
    paddingRight: 1,
    textAlign: 'right',
  }
}

const Channel = React.createClass({

  // setChannelStart(start)

  render() {

    let { onClick, setChannelWindow, active, color, label, window } = this.props;

    return (
      <Form inline>
        <FormGroup bsSize="small">
        <Button
          onClick={onClick}
          bsSize="small"
          style={{
          'outline': '0',
          'backgroundColor': '#' + color,
          'opacity': active ? '1' : '0.5',
          'float': 'left',
          'width': 60,
          'overflow': 'hidden',

        }}
        >{label}</Button>

        <input style={styles.txt} className="chStartTxt form-control" value={window.start} type="number"></input>
        <section className="range-slider">
          <input type="range" min={window.min} max={window.max} value={window.start} className="chStart"
                  onChange={(event) => {setChannelWindow({start: parseInt(event.target.value)}, true)}}
                  onMouseUp={(event) => {setChannelWindow({start: parseInt(event.target.value)})}}
          ></input>
          <input type="range" min={window.min} max={window.max} value={window.end} className="chEnd"
                  onChange={(event) => {setChannelWindow({end: parseInt(event.target.value)}, true)}}
                  onMouseUp={(event) => {setChannelWindow({end: parseInt(event.target.value)})}}
          ></input>
        </section>
        <input style={styles.txt} className="chEndTxt form-control" value={window.end} type="number"></input>
        </FormGroup>
      </Form>
    )
  }
})

Channel.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default Channel