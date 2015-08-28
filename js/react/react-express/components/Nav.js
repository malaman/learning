'use strict';
var React = require('react');
import { NavLink } from 'fluxible-router';
import {excludedLinksFromNav} from '../configs/general';


class Nav extends React.Component {
    render() {
      const selected = this.props.selected;
      const links = this.props.links;

      const linkHTML = Object.keys(links).map(function (name) {
        var className = 'navigation_item';
        var link = links[name];

        if (selected === name) {
          className = className + ' ' + 'navigation_item--selected';
        }

        if (excludedLinksFromNav.indexOf(name) === -1 ) {
          return (
            <li className={className} key={link.path}>
                <NavLink className="navigation_item__href" routeName={link.page}>{link.title}</NavLink>
            </li>
          );
        }

      });

      return (
          <ul className="navigation">
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
