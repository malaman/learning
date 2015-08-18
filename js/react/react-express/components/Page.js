import React, { Component, PropTypes } from "react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";


class Page extends Component {

  render() {
    const { footer } = this.props;

    return (
      <div className="Page">
        <div className="Page-header">
          <Nav selected={this.props.selected} links={this.props.links} />
        </div>

        <div className="container">
          { this.props.children }
        </div>

        { footer &&
          <div className="Page-footer">
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
