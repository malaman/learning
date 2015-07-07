'use strict';
var React = require('react');
var Select = require('./Select');

import {getMaxAgeAction, getManufacturersAction,
  changeYearAction, getAllActiveManufacturers, changeManufacturerAction} from "../actions/WidgetActionsCreators";
import WidgetStore from '../stores/WidgetStore';
import connectToStores from 'fluxible/addons/connectToStores';



var Widget = React.createClass({
  displayName: "Widget",

  propTypes: function() {
    return {
      years: PropTypes.Array.isRequired,
      manufacturers: PropTypes.Array.isRequired,
      selectedYear: PropTypes.String.isRequired
    }
  },

  contextTypes: {
      executeAction: React.PropTypes.func.isRequired,
      getStore: React.PropTypes.func.isRequired
  },


  componentDidMount: function() {
    this.context.executeAction(getMaxAgeAction, {});
    if (this.props.manufacturers.length === 0) {
      this.context.executeAction(getAllActiveManufacturers, {});
    }
  },

  selectYearChangeHandler: function(event) {
    this.context.executeAction(changeYearAction, event.target.value);
    this.context.executeAction(getManufacturersAction, {year: event.target.value});
  },

  selectManufacturerHandler: function(event) {
    this.context.executeAction(changeManufacturerAction, event.target.value);
  },

  render: function() {

    const years = this.props.years;
    const manufacturers = this.props.manufacturers;
    const selectedYear = this.props.selectedYear;
    const selectedManufacturer = this.props.selectedManufacturer;
    console.log('manufacturers: ' +manufacturers);

    return React.createElement("div", {className: "container"},
      React.createElement("div", {className:"row"},
        React.createElement("label", {"className": "horizontal-label"}, "Year"),
        React.createElement(Select, {
          className: "year",
          options: years,
          value: selectedYear,
          onChange: this.selectYearChangeHandler
        })),
        React.createElement("div", {className:"row"},
          React.createElement("label", {"className": "horizontal-label"}, "Manufacturer"),
          React.createElement(Select, {
            className: "year",
            options: manufacturers,
            value: selectedManufacturer,
            onChange: this.selectManufacturerHandler
          })
      )
    );
  }

});

Widget = connectToStores(Widget, [WidgetStore], function (stores, props) {
    return {
      years: stores.WidgetStore.getYears(),
      manufacturers: stores.WidgetStore.getManufacturers(),
      selectedYear: stores.WidgetStore.getSelectedYear(),
      selectedManufacturer: stores.WidgetStore.getSelectedManufacturer()
    }
});


module.exports = Widget;
