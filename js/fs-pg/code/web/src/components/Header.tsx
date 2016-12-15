import * as React from 'react';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import {Link} from './Link';
import {history} from '../routes/history';

interface HeaderProps {
    location?: any;
}

export class Header extends React.Component<HeaderProps, {}> {
    clickHandler(url) {
        return () => history.push(url);
    }

    render() {
        return (
            <Navbar>
                <Nav bsStyle='tabs' activeKey={this.props.location.pathname}>
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
