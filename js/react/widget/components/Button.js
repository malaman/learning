'use strict';
var React = require('react');


class Button extends React.Component {

  render() {
    return React.createElement("button", {className: "btn btn-success btn-group", onClick: this.props.onClick},
      this.props.caption);
  };
}

export default Button;
