'use strict';
var React = require('react');
import {myCustomAction} from "../actions/WidgetActionsCreators";


var Select = React.createClass({
  displayName: "Select",

  contextTypes: {
   executeAction: React.PropTypes.func.isRequired
  },

  componentDidMount: function() {
    this.context.executeAction(myCustomAction, 'this is message for console');
  },


  render: function() {
    var options = [];
    for (var item of this.props.options) {
      options.push(React.createElement("option", {key:item}, item));
    }

    return React.createElement("select", {className: "form-control", onChange: this.props.onChange,
        value: this.props.value},
      options);
  }

});


module.exports = Select;
