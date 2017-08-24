import * as React from 'react';
import {Row, Button, Label} from 'react-bootstrap';
import {connect} from 'react-redux';
import {increment} from '../actions/userActions';

interface StateProps {
  counter: number;
  home: string;
}

interface DispatchProps {
  increment: Function;
}

type Props = StateProps & DispatchProps;

class HomeClass extends React.Component<Props, {}> {
  handleBtnClick() {
    this.props.increment();
  };

  render() {
    return (
      <div>
        <Row>
          <h2>Home Page</h2>
          {this.props.home}
        </Row>
        <Row>
          <div style={{marginBottom: 15, marginTop: 15}}>
            <Label id='counter-value'>
              {this.props.counter}
            </Label>
          </div>
          <Button onClick={this.handleBtnClick.bind(this)}>
            Increment
          </Button>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state): StateProps {
  return {
    home: state.ui.home,
    counter: state.ui.counter
  };
}

export const Home = connect<StateProps, DispatchProps, any>(
  mapStateToProps,
  {increment}
)(HomeClass);
