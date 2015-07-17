'use strict';
var React = require('react');
import Button from './Button';


var Estimation = React.createClass({
  displayName: "Estimation",

  getDefaultProps: function() {
    return {
      vehicle_information: ''
    }
  },


  render: function() {

    return React.createElement("div", {className: "row"},
      React.createElement("div", {className: "row"},
        React.createElement("h1", null, this.props.estimation.vehicle_information)
      ),
      React.createElement("div", {className:"row"},
        React.createElement("br", null, null),
        React.createElement(Button, {
          onClick: null,
          caption: "Submit",
          disabled: false
        }, null )
      )
    );
  }

});

export default Estimation;
