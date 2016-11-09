import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import {Grid, Row} from 'react-bootstrap';

export class About extends Component {
  static propTypes = {
  };

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

export default connect(
  mapStateToProps,
)(About);
