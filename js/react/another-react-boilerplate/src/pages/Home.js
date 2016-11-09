import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home Page</h2>
        {this.props.home}
      </div>
    );
  }
}

Home.propTypes = {
  home: PropTypes.string
};

function mapStateToProps(state) {
  return {
    home: state.ui.home
  };
}

export default connect(
  mapStateToProps,
  {}
)(Home);
