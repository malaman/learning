'use strict';
var React = require('react');
import { NavLink } from 'fluxible-router';

class Nav extends React.Component {
    render() {
        const selected = this.props.selected;
        const links = this.props.links;
        const excludedLinks = ['models'];

        const linkHTML = Object.keys(links).map(function (name) {
            var className = '';
            var link = links[name];

            if (selected === name) {
                className = 'pure-menu-selected';
            }

            if (excludedLinks.indexOf(name) === -1 ) {
              return (
                <li className={className} key={link.path}>
                    <NavLink routeName={link.page} activeStyle={{backgroundColor: '#eee'}}>{link.title}</NavLink>
                </li>
            );


            }

        });

        return (
            <ul className="pure-menu pure-menu-open pure-menu-horizontal">
                {linkHTML}
            </ul>
        );
    }
}

Nav.defaultProps = {
    selected: 'home',
    links: {}
};

module.exports = Nav;
