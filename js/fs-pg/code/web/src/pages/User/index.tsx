import * as React from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';
import { MatchWithSubRoutes } from '../../routes';

import {Grid, Row} from 'react-bootstrap';

import {getPosts} from '../../actions/userActions'

// User.propTypes = {
//   routes: PropTypes.array,
//   params: PropTypes.object.isRequired,
//   pathname: PropTypes.string.isRequired,
//   location: PropTypes.object.isRequired,
//   getPosts: PropTypes.func.isRequired,
//   getUserInfo: PropTypes.func.isRequired
// };


interface UserProps {
    routes: Array<any>;
    params: Object;
    pathname: String;
    location: any;
    getPosts: Function;
};

export class User extends React.Component<UserProps, {}> {

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
        console.log('this.props', this.props);
        const { pathname, location, routes } = this.props;
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
                {routes.map((route, i) => <MatchWithSubRoutes key={i} {...route} />)}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        about: state.ui.about
    };
}

export default connect(
    mapStateToProps,
    {getPosts}
)(User);

// import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
// import { Nav, NavItem } from 'react-bootstrap';
//
// import { getPosts, getUserInfo } from '../../actions/UserActions';
//
// import getCookie from '../../helpers/getCookie';
// import { MatchWithSubRoutes } from '../../routes';
//
// class User extends Component {
//   handleNavSelect = this.handleNavSelect.bind(this);
//
  // componentDidMount() {
  //   // read 'userId' cookie and fire xhr call to get posts and user info
  //   const userId = getCookie('userId');
  //   if (userId) {
  //     this.props.getPosts(userId);
  //     this.props.getUserInfo(userId);
  //   }
  // }
  //
  // handleNavSelect(pathname) {
  //   return () => this.context.router.transitionTo(pathname);
  // }
  //
  // render() {
  //   const { pathname, location, routes } = this.props;
  //   return (
  //     <div className='counter-container'>
  //       <Nav bsStyle='tabs' activeKey={location.pathname}>
  //         <NavItem eventKey='/user' onClick={this.handleNavSelect(pathname)}>
  //           Posts
  //         </NavItem>
  //         <NavItem eventKey={`${pathname}/info`} onClick={this.handleNavSelect(`${pathname}/info`)}>
  //           Info
  //         </NavItem>
  //         <NavItem eventKey={`${pathname}/newPost`} onClick={this.handleNavSelect(`${pathname}/newPost`)}>
  //           New Post
  //         </NavItem>
  //       </Nav>
  //         {routes.map((route, i) => <MatchWithSubRoutes key={i} {...route} />)}
  //     </div>
  //   );
  // }
// }
//
// User.propTypes = {
//   routes: PropTypes.array,
//   params: PropTypes.object.isRequired,
//   pathname: PropTypes.string.isRequired,
//   location: PropTypes.object.isRequired,
//   getPosts: PropTypes.func.isRequired,
//   getUserInfo: PropTypes.func.isRequired
// };
//
// User.contextTypes = {
//   router: PropTypes.object.isRequired
// };
//
// function mapStateToProps() {
//   return {};
// }
//
// export default connect(
//   mapStateToProps,
//   {getPosts, getUserInfo}
// )(User);
