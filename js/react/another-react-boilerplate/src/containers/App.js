import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Miss from 'react-router/Miss';

import Header from '../components/Header';
import Footer from '../components/Footer';
import NotFound from '../components/NotFound';
import {MatchWithSubRoutes} from '../routes';

class App extends Component {
  static propTypes = {
    routes: PropTypes.array.isRequired,
    pathname: PropTypes.string.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  render() {
    const {routes, } = this.props;
    return (
      <div>
        <Header  {...this.props} />
        {routes.map((route, i) => <MatchWithSubRoutes key={i} {...route} />)}
        <Miss component={NotFound} />
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  routes: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(
  mapStateToProps
)(App);
