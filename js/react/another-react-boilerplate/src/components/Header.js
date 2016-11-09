import React, {PropTypes} from 'react';
import {Glyphicon, MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import {Link} from 'react-router';

class Header extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  handleNavSelect = this.handleNavSelect.bind(this);

  handleNavSelect(pathname) {
    return () => this.context.router.transitionTo(pathname);
  }

  render() {
    const {pathname, location} = this.props;
    console.log('this.props', this.props);
    return (
      <Navbar>
        <Nav bsStyle='tabs' activeKey={location.pathname}>
          <NavItem eventKey='/' onClick={this.handleNavSelect('/')}>
            Home
          </NavItem>
          <NavItem eventKey='/about' onClick={this.handleNavSelect('/about')}>
            About
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
