import React, { Component, PropTypes } from "react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

class Page extends Component {

  render() {
    const { footer } = this.props;

    return (
      <div className="page">
        <div className="header">
          <a className="header_logo" href="http://www.etachki.com"></a>
          <Nav selected={this.props.selected} links={this.props.links} />
        </div>

        <div className="content container">
          { this.props.children }
        </div>

        { footer &&
          <div className="footer">
            <Footer />
          </div> }

      </div>
    );
  }
}

Page.propTpyes = {
    footer: PropTypes.bool
};

Page.defaultProps = {
    footer: true
};

export default Page;
