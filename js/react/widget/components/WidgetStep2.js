'use strict';
import React from 'react';
import Select from './Select';

import {getMaxAgeAction, getManufacturersAction,
  changeYearAction, getAllActiveManufacturers, changeManufacturerAction,
  getModelsAction} from "../actions/WidgetActionsCreators";
import WidgetStore from '../stores/WidgetStore';
import ApplicationStore from '../stores/ApplicationStore';
import connectToStores from 'fluxible/addons/connectToStores';



var WidgetStep2 = React.createClass({
  displayName: "WidgetStep2",

  //propTypes: function() {
  //  return {
  //    years: React.PropTypes.Array.isRequired,
  //    manufacturers: React.PropTypes.Array.isRequired,
  //    models: React.PropTypes.Array.isRequired,
  //    selectedYear: React.PropTypes.String.isRequired,
  //    selectedManufacturer: React.PropTypes.String.isRequired,
  //    selectedModel: React.PropTypes.String.isRequired
  //  }
  //},

  contextTypes: {
      executeAction: React.PropTypes.func.isRequired,
      getStore: React.PropTypes.func.isRequired
  },


  componentDidMount: function() {

  },

  render: function() {
    const id = this.context.getStore(ApplicationStore).getId();
    return React.createElement("div", {className: "container"}, id);
  }

});

export default WidgetStep2;
