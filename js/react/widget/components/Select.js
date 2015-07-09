'use strict';
var React = require('react');


var Select = React.createClass({
  displayName: "Select",

  render: function() {
    var options = [];
    for (var item of this.props.options) {
      options.push(React.createElement("option", {key:item.value, value:item.value}, item.text));
    }

    return React.createElement("select", {className: "form-control", onChange: this.props.onChange,
        value: this.props.value, disabled: this.props.disabled},
      options);
  }

});

export default Select;
