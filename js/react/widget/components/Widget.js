'use strict';
import React from 'react';
import Select from './Select';
import Button from './Button';

import {getMaxAgeAction, getManufacturersAction,
  changeYearAction, getAllActiveManufacturers, getSeriesAction, changeManufacturerAction,
  getModelsAction, changeModelAction, changeStepAction, changeSeriesAction} from "../actions/WidgetActionsCreators";
import WidgetStore from '../stores/WidgetStore';
import connectToStores from 'fluxible/addons/connectToStores';
import Settings from '../constants/Settings';



var Widget = React.createClass({
  displayName: "Widget",

  propTypes: function() {
    return {
      years: React.PropTypes.array.isRequired,
      manufacturers: React.PropTypes.array.isRequired,
      models: React.PropTypes.array.isRequired,
      series: React.PropTypes.array.isRequired,
      selectedYear: React.PropTypes.object.isRequired,
      selectedManufacturer: React.PropTypes.object.isRequired,
      selectedModel: React.PropTypes.object.isRequired,
      selectedSeria: React.PropTypes.object.isRequired
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
    console.log(this.props.selectedYear);
    this.context.executeAction(getModelsAction, {year: this.props.selectedYear, manufacturer: event.target.value});
  },
  selectModelHandler: function(event) {
    this.context.executeAction(changeModelAction, event.target.value);
    this.context.executeAction(getSeriesAction, {year: this.props.selectedYear, model: event.target.value});
  },

  step1ButtonClickHandler: function(event) {
    this.context.executeAction(changeStepAction,2);
  },

  render: function() {
    function isModelSelectorDisabled(models) {
      return (models && models.length <= 1)
    }

    const step = this.props.step;
    const years = this.props.years;
    const manufacturers = this.props.manufacturers;
    const models = this.props.models;
    const series = this.props.series;
    const selectedYear = this.props.selectedYear;
    const selectedManufacturer = this.props.selectedManufacturer;
    const selectedModel = this.props.selectedModel;
    const selectedSeria = this.props.selectedSeria;

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
        return React.createElement("div", {className: "container"},
          React.createElement("div", {className:"row"},
            React.createElement("label", {"className": "horizontal-label"}, "Seria"),
            React.createElement(Select, {
              className: "Seria",
              options: series,
              value: selectedSeria,
              onChange: this.selectYearChangeHandler,
              disabled: false
            })),
            React.createElement("label", {"className": "horizontal-label"}, "Seria"),
            React.createElement(Select, {
              className: "Seria",
              options: series,
              value: selectedSeria,
              onChange: this.selectYearChangeHandler,
              disabled: false
            }))
          );
      }
    }

  }

});

Widget = connectToStores(Widget, [WidgetStore], function (stores, props) {
    return {
      step: stores.WidgetStore.getStep(),
      years: stores.WidgetStore.getYears(),
      manufacturers: stores.WidgetStore.getManufacturers(),
      models: stores.WidgetStore.getModels(),
      series: stores.WidgetStore.getSeries(),
      selectedYear: stores.WidgetStore.getSelectedYear(),
      selectedManufacturer: stores.WidgetStore.getSelectedManufacturer(),
      selectedModel: stores.WidgetStore.getSelectedModel(),
      selectedSeria: stores.WidgetStore.getSelectedSeria()
    }
});


export default Widget;
