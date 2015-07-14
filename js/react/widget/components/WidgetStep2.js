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
