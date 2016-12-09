import * as React from 'react';
import { connect } from 'react-redux';

import {Grid, Row} from 'react-bootstrap';

interface AboutProps {
    about: string;
}

export class AboutClass extends React.Component<AboutProps, {}> {
    render () {
        return (
            <Grid>
                <Row>
                    <h2>About Page</h2>
                    {this.props.about}
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        about: state.ui.about
    };
}

export const About = connect(
    mapStateToProps,
)(AboutClass);
