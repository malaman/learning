import React, { Component, PropTypes } from 'react';
import {Row, Button, Label} from 'react-bootstrap';
import { connect } from 'react-redux';
import {increment} from '../actions/actions';

class Home extends Component {
  handleBtnClick = this.handleBtnClick.bind(this);

  handleBtnClick() {
    if (this.props.counter === 5) {
      window['optimizely'] = window['optimizely'] || [];
      window['optimizely'].push({
        type: "event",
        eventName: 'COUNTER_5'
      });
    }
    this.props.increment();
  }
  render() {
    return (
      <div>
        <h2>Home Page</h2>
        {this.props.home}
        <Row>
          <Label id='counter-value'>
            {this.props.counter}
          </Label>
          <br />
          <Button onClick={this.handleBtnClick}>
            Increment
          </Button>
        </Row>
      </div>
    );
  }
}

Home.propTypes = {
  home: PropTypes.string
};

function mapStateToProps(state) {
  return {
    home: state.ui.home,
    counter: state.ui.counter
  };
}

export default connect(
  mapStateToProps,
  {increment}
)(Home);
