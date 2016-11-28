import * as React from 'react';
import {Nav, Navbar, NavItem} from 'react-bootstrap';

interface HeaderProps {
    pathname: any;
    location: any;
}

class Header extends React.Component<HeaderProps, {}> {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    handleNavSelect(pathname) {
        return () => this.context.router.transitionTo(pathname);
    }

    render() {
        const {location} = this.props;
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
