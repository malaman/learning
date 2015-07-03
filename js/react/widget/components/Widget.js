'use strict';
var React = require('react');
var Select = require('./Select');
var getManufacturersAction = require('../actions/getManufacturers');
var getMaxAgeAction = require('../actions/getMaxAgeAction')
import WidgetStore from '../stores/WidgetStore'



var Widget = React.createClass({
  displayName: "Widget",

  contextTypes: {
      executeAction: React.PropTypes.func.isRequired,
      getStore: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    this.context.executeAction(getManufacturersAction, { /*payload*/ });
    this.context.executeAction(getMaxAgeAction, {});
    return {
      years:this.context.getStore(WidgetStore).getYears(),
      manufacturerOptions: this.context.getStore(WidgetStore).getManufacturers()
    }
  },

  componentDidMount: function() {
  },

  selectYearChangeHandler: function(event) {
    console.log(event.target.value);
  },

  render: function() {
    return React.createElement("div", {className: "container"},
      React.createElement("div", {className:"row"},
        React.createElement("label", {"className": "horizontal-label"}, "Manufacturer"),
        React.createElement(Select, {
          className: "year",
          options: this.state.years,
          onChange: this.selectYearChangeHandler
        })
      ))
    ;
  }

});

module.exports = Widget;
