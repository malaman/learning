'use strict';
import React from 'react';
import Select from './Select';
import Button from './Button';

import {getMaxAgeAction, getManufacturersAction,
  changeYearAction, getAllActiveManufacturers, changeManufacturerAction,
  getModelsAction, changeModelAction} from "../actions/WidgetActionsCreators";
import WidgetStore from '../stores/WidgetStore';
import connectToStores from 'fluxible/addons/connectToStores';
import Settings from '../constants/Settings';



var Widget = React.createClass({
  displayName: "Widget",

  propTypes: function() {
    return {
      years: React.PropTypes.Array.isRequired,
      manufacturers: React.PropTypes.Array.isRequired,
      models: React.PropTypes.Array.isRequired,
      selectedYear: React.PropTypes.String.isRequired,
      selectedManufacturer: React.PropTypes.String.isRequired,
      selectedModel: React.PropTypes.String.isRequired
    }
  },

  contextTypes: {
      executeAction: React.PropTypes.func.isRequired,
      getStore: React.PropTypes.func.isRequired
  },


  componentDidMount: function() {
    if (this.props.selectedYear === null) {
      this.context.executeAction(getMaxAgeAction, {});
    }
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
    this.context.executeAction(getModelsAction,{year: this.props.selectedYear, manufacturer: event.target.value});
  },
  selectModelHandler: function(event) {
    this.context.executeAction(changeModelAction, event.target.value);
  },

  step1ButtonClickHandler: function(event) {
    console.log(event);
  },

  render: function() {
    function isModelSelectorDisabled(models) {
      return (models && models.length <= 1)
    }

    const years = this.props.years;
    const manufacturers = this.props.manufacturers;
    const models = this.props.models;
    const selectedYear = this.props.selectedYear;
    const selectedManufacturer = this.props.selectedManufacturer;
    const selectedModel = this.props.selectedModel;
    const step = this.props.step;
    switch (step) {
      case 1: {
        return React.createElement("div", {className: "container"},
          React.createElement("div", {className:"row"},
            React.createElement("label", {"className": "horizontal-label"}, "Year"),
            React.createElement(Select, {
              className: "year",
              options: years,
              value: selectedYear,
              onChange: this.selectYearChangeHandler,
              disabled: false
            })),
            React.createElement("div", {className:"row"},
              React.createElement("label", {"className": "horizontal-label"}, "Manufacturer"),
              React.createElement(Select, {
                className: "year",
                options: manufacturers,
                value: selectedManufacturer,
                onChange: this.selectManufacturerHandler,
                disabled: false
              })
            ),
            React.createElement("div", {className:"row"},
              React.createElement("label", {"className": "horizontal-label"}, "Model"),
              React.createElement(Select, {
                className: "year",
                options: models,
                value: selectedModel,
                onChange: this.selectModelHandler,
                disabled: isModelSelectorDisabled(models)
              })
            ),
            React.createElement("div", {className:"row"},
              React.createElement("br", null, null),
              React.createElement(Button, {
                onClick: this.step1ButtonClickHandler,
                caption: "Submit",
                disabled: false
              }, null )
            )
        );
      }
      case 2: {
        return (
          <div>
            This is step 2.
          </div>
        )
      }
    }

  }

});

Widget = connectToStores(Widget, [WidgetStore], function (stores, props) {
    return {
      years: stores.WidgetStore.getYears(),
      manufacturers: stores.WidgetStore.getManufacturers(),
      models: stores.WidgetStore.getModels(),
      selectedYear: stores.WidgetStore.getSelectedYear(),
      selectedManufacturer: stores.WidgetStore.getSelectedManufacturer(),
      selectedModel: stores.WidgetStore.getSelectedModel(),
      step: stores.WidgetStore.getStep()
    }
});


export default Widget;
