import * as React from 'react';
import {connect} from 'react-redux';
import {Nav, NavItem} from 'react-bootstrap';

import {Grid, Row} from 'react-bootstrap';

import {getPosts} from '../../actions/userActions'

interface UserProps {
  routes: any[];
  params: Object;
  pathname: String;
  location: {
    pathname: string
  };
  getPosts: Function;
}
;

export class UserClass extends React.Component<any, {}> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getPosts('584164609c0dd40b6e1d65ab');
  }

  handleNavSelect(pathname) {
    return () => this.context.router.transitionTo(pathname);
  }

  render() {
    const {pathname, location, routes} = this.props;
    return (
      <div className='counter-container'>
        <Nav bsStyle='tabs' activeKey={location.pathname}>
          <NavItem eventKey='/user' onClick={this.handleNavSelect(pathname)}>
            Posts
          </NavItem>
          <NavItem eventKey={`${pathname}/info`} onClick={this.handleNavSelect(`${pathname}/info`)}>
            Info
          </NavItem>
          <NavItem eventKey={`${pathname}/newPost`} onClick={this.handleNavSelect(`${pathname}/newPost`)}>
            New Post
          </NavItem>
        </Nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    about: state.ui.about
  };
}

export const User = connect(
  mapStateToProps,
  {getPosts}
)(UserClass);
