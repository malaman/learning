import * as React from 'react';
import {Row, Button, Label} from 'react-bootstrap';
import { connect } from 'react-redux';
import {increment} from '../actions/userActions';

interface HomeProps {
    counter: number;
    home; string;
    increment: Function;
}

class Home extends React.Component<HomeProps, {}> {
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
