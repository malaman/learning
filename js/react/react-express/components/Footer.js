import React, { Component } from "react";
import { NavLink } from "fluxible-router";

class Footer extends Component {

  render() {
    return (
        <div className="footer">
          <p>
          Simple react/express catalog application for etachki.com public API.
          Read more on <a href="/about">About</a> page.
          </p>
        </div>
    );
  }

}

export default Footer;
