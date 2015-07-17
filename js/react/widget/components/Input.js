'use strict';
var React = require('react');


var Input = React.createClass({
  displayName: "Input",

  getDefaultProps: function() {
    return {
      pattern: '.*'
    }
  },

  getInitialState: function() {
    return {
      value: this.props.value
    };
  },

  validate: function(value) {
    if (value.length === 0) {
      return true
    }
    var match = value.match(new RegExp(this.props.pattern, 'g'));
    return (match && match.join('') === value);
  },

  render: function() {
    return React.createElement("input", {className: "form-control", onChange: this.props.onChange.bind(null, this),
        value: this.state.value, disabled: this.props.disabled,
        type: this.props.type, placeholder: this.props.placeholder});
  }

});

export default Input;
