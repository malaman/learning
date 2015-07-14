'use strict';
var React = require('react');


var Input = React.createClass({
  displayName: "Input",

  getInitialState: function() {
    return {
      value: null
    };
  },

  getDefaultProps: function() {
    return {
      pattern: '[0-9\.]+'
    };
  },

  validate: function(value) {
    var match = value.match(new RegExp(this.props.pattern, 'g'));
    return (match && match.join('') === value);
  },

  _onChange: function(event) {
    let value = event.target.value;

    if (this.validate(value)) {
      this.setState({value: value});
    }
  },

  render: function() {
    return React.createElement("input", {className: "form-control", onChange: this._onChange,
        value: this.state.value, disabled: this.props.disabled,
        type: this.props.type, placeholder: this.props.placeholder});
  }

});

export default Input;
