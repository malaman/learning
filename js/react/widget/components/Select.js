'use strict';
var React = require('react');
var myCustomAction = require('../actions/myCustomAction');


var Select = React.createClass({
  displayName: "Select",
  contextTypes: {
   executeAction: React.PropTypes.func.isRequired
  },
  getInitialState: function() {

    var options = [];
    for (var item of this.props.options) {
      options.push(React.createElement("option", {key:item}, item));
    }

    return {
      options: options
    }
  },

  componentDidMount: function() {
    this.context.executeAction(myCustomAction, 'this is message for console');
  },


  render: function() {
    return React.createElement("select", {className: "form-control", onChange: this.props.onChange},
      this.state.options);
  }

});


module.exports = Select;
