'use strict';
import React from 'react';
import Select from './Select';
import Button from './Button';
import Input from './Input';
import Estimation from './Estimation.js'

import {getMaxAgeAction, getManufacturersAction,
  changeYearAction, getAllActiveManufacturers, getSeriesAction, changeManufacturerAction,
  getModelsAction, getModificationsAction, getAllRegionsAction,
  changeModelAction, changeStepAction,
  changeSeriaAction, changeModificationAction, changeRegionAction,
  changeOdometerAction, changeEmailAction, determinePriceAction,
  evaluateAgainAction} from "../actions/WidgetActionsCreators";
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
      selectedSeria: React.PropTypes.object.isRequired,
      strangeVariable: React.PropTypes.object.isRequired
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
    this.context.executeAction(changeManufacturerAction, event.nativeEvent.target.selectedIndex);
    this.context.executeAction(getModelsAction, {year: this.props.selectedYear, manufacturer: event.target.value});
  },
  selectModelHandler: function(event) {
    this.context.executeAction(changeModelAction, event.nativeEvent.target.selectedIndex);
    this.context.executeAction(getSeriesAction, {year: this.props.selectedYear, model: event.target.value});
  },

  step1ButtonClickHandler: function(event) {
    this.context.executeAction(changeStepAction,2);
  },

  selectSeriaChangeHandler: function(event) {
    this.context.executeAction(changeSeriaAction, event.nativeEvent.target.selectedIndex);
    this.context.executeAction(getModificationsAction, {seria: event.target.value});
  },

  selectModificationChangeHandler: function(event) {
    this.context.executeAction(changeModificationAction, event.nativeEvent.target.selectedIndex);
  },

  step2ButtonClickHandler: function(event) {
    this.context.executeAction(changeStepAction,3);
    this.context.executeAction(getAllRegionsAction, null);
  },

  selectRegionChangeHandler: function(event) {
    this.context.executeAction(changeRegionAction, event.nativeEvent.target.selectedIndex);
  },

  step3ButtonClickHandler: function(event) {
    this.context.executeAction(determinePriceAction, {year: this.props.selectedYear, maker:this.props.selectedManufacturer,
    model: this.props.selectedModel, seria: this.props.selectedSeria, modification: this.props.selectedModification,
    odometer: this.props.odometer, email: this.props.email, region: this.props.selectedRegion});
    this.context.executeAction(changeStepAction,4);
  },


  inputOdometerChangeHandler: function(component, event) {
    let value = event.target.value;

    if (component.validate(value)) {
      component.setState({value: value});
      this.context.executeAction(changeOdometerAction, value);
    }
  },

  inputEmailChangeHandler: function(component, event) {
    let value = event.target.value;

    if (component.validate(value)) {
      component.setState({value: value});
      this.context.executeAction(changeEmailAction, value);
    }
  },

  evaluateAgainButtonClick: function() {
    this.context.executeAction(evaluateAgainAction, null);
    this.forceUpdate();
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
    const modifications = this.props.modifications;
    const regions = this.props.regions;
    const selectedYear = this.props.selectedYear;
    const selectedManufacturer = this.props.selectedManufacturer.value;
    const selectedModel = this.props.selectedModel.value;
    const selectedSeria = this.props.selectedSeria.value;
    const selectedModification = this.props.selectedModification.value;
    const selectedRegion = this.props.selectedRegion.value;
    const odometer = this.props.odometer;
    const email = this.props.email;

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
              onChange: this.selectSeriaChangeHandler,
              disabled: false
            })),
          React.createElement("div", {className:"row"},
            React.createElement("label", {"className": "horizontal-label"}, "Modification"),
            React.createElement(Select, {
              className: "Modificaiton",
              options: modifications,
              value: selectedModification,
              onChange: this.selectModificationChangeHandler,
              disabled: false
            })),
          React.createElement("div", {className:"row"},
            React.createElement("br", null, null),
            React.createElement(Button, {
              onClick: this.step2ButtonClickHandler,
              caption: "Submit",
              disabled: false
            }, null )
          )
        );
      }
      case 3: {
        return React.createElement("div",null,
          React.createElement("div", {className:"row"},
            React.createElement("label", {"className": "horizontal-label"}, "Odometer"),
            React.createElement(Input, {
              className: "Odometer",
              value: odometer,
              placeholder: Settings.customStrings.FILL_ODOMETER,
              type: "text",
              pattern: '[0-9\.]+',
              onChange: this.inputOdometerChangeHandler,
              disabled: false
            })),
          React.createElement("div", {className:"row"},
            React.createElement("label", {"className": "horizontal-label"}, "Regions"),
            React.createElement(Select, {
              className: "Regions",
              options: regions,
              value: selectedRegion,
              onChange: this.selectRegionChangeHandler,
              disabled: false
            })),
          React.createElement("div", {className:"row"},
            React.createElement("label", {"className": "horizontal-label"}, "email"),
            React.createElement(Input, {
              className: "Email",
              value: email,
              placeholder: Settings.customStrings.FILL_EMAIL,
              type: "email",
              onChange: this.inputEmailChangeHandler,
              disabled: false
            })),
          React.createElement("div", {className:"row"},
            React.createElement("br", null, null),
            React.createElement(Button, {
              onClick: this.step3ButtonClickHandler,
              caption: "Submit",
              disabled: false
            }, null )
          )
        );
      }
      case 4: {
        return React.createElement(Estimation, {estimation: this.props.estimation,
          onButtonClick: this.evaluateAgainButtonClick, buttonCaption: Settings.customStrings.EVALUATE_AGAIN});
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
      modifications: stores.WidgetStore.getModifications(),
      regions: stores.WidgetStore.getRegions(),
      odometer: stores.WidgetStore.getOdometer(),
      email: stores.WidgetStore.getEmail(),

      selectedYear: stores.WidgetStore.getSelectedYear(),
      selectedManufacturer: stores.WidgetStore.getSelectedManufacturer(),
      selectedModel: stores.WidgetStore.getSelectedModel(),
      selectedSeria: stores.WidgetStore.getSelectedSeria(),
      selectedModification: stores.WidgetStore.getSelectedModification(),
      selectedRegion: stores.WidgetStore.getSelectedRegion(),
      estimation: stores.WidgetStore.getEstimation()

    }
});


export default Widget;
