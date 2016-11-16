import React, {PropTypes} from 'react';
import {Nav, Navbar, NavItem} from 'react-bootstrap';

class Header extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  handleNavSelect = this.handleNavSelect.bind(this);

  handleNavSelect(pathname) {
    return () => this.context.router.transitionTo(pathname);
  }

  componentDidMount() {
    window['optimizely'] = window['optimizely'] || [];
    window['optimizely'].push({type: "page", pageName: "home"});
  }

  render() {
    const {pathname, location} = this.props;
    return (
      <Navbar>
        <Nav bsStyle='tabs' activeKey={location.pathname}>
          <NavItem eventKey='/' onClick={this.handleNavSelect('/')} id='home_page_link'>
            Home
          </NavItem>
          <NavItem eventKey='/about' onClick={this.handleNavSelect('/about')} id='about_page_link'>
            About
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
