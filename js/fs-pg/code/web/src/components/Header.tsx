import * as React from 'react';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import {Link} from './Link';
import {history} from '../routes/history';

interface HeaderProps {
    pathname: any;
    location: any;
}

export class Header extends React.Component<{}, {}> {
    clickHandler(url) {
        return () => history.push(url);
    }

    render() {
        return (
            <Navbar>
                <Nav bsStyle='tabs' activeKey={history.location.pathname}>
                    <NavItem eventKey='/' onClick={this.clickHandler('/')}>
                        Home
                    </NavItem>
                    <NavItem eventKey='/user' onClick={this.clickHandler('/user')}>
                        Users
                    </NavItem>
                    <NavItem eventKey='/about' onClick={this.clickHandler('/about')}>
                        About
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}
