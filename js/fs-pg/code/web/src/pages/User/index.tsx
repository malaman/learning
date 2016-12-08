import * as React from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';
import { MatchWithSubRoutes } from '../../routes';

import {Grid, Row} from 'react-bootstrap';

import {getPosts} from '../../actions/userActions'

interface UserProps {
    routes: Array<any>;
    params: Object;
    pathname: String;
    location: {
        pathname: string
    };
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
