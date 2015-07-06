'use strict';
var React = require('react');
var Select = require('./Select');

import {getMaxAgeAction, getManufacturersAction} from "../actions/WidgetActionsCreators";
import WidgetStore from '../stores/WidgetStore';
import connectToStores from 'fluxible/addons/connectToStores';



var Widget = React.createClass({
  displayName: "Widget",

  propTypes: function() {
    return {
      years: PropTypes.Array.isRequired,
      manufacturers: PropTypes.Array.isRequired
    }
  },

  contextTypes: {
      executeAction: React.PropTypes.func.isRequired,
      getStore: React.PropTypes.func.isRequired
  },


  componentDidMount: function() {
    this.context.executeAction(getManufacturersAction, { /*payload*/ });
    this.context.executeAction(getMaxAgeAction, {});
  },

  selectYearChangeHandler: function(event) {
    this.setState({
      selected: event.target.selected
    });

    console.log(event.target.value);
  },

  render: function() {

    const years = this.props.years;
    const manufacturers = this.props.manufacturers;
    console.log('years ' + years);

    return React.createElement("div", {className: "container"},
      React.createElement("div", {className:"row"},
        React.createElement("label", {"className": "horizontal-label"}, "Manufacturer"),
        React.createElement(Select, {
          className: "year",
          options: years,
          onChange: this.selectYearChangeHandler
        }),
        React.createElement(Select, {
          className: "manufacturer",
          options: manufacturers,
          onChange: this.selectYearChangeHandler,
          value: manufacturers[0]
        }),
        React.createElement("div", null, years)
      ))

    ;
  }

});

Widget = connectToStores(Widget, [WidgetStore], function (stores, props) {
    return {
      years: stores.WidgetStore.getYears(),
      manufacturers: stores.WidgetStore.getManufacturers()
    }
});


module.exports = Widget;
