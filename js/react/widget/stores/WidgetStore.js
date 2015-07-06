import BaseStore from 'fluxible/addons/BaseStore';
import Actions from "../constants/Actions";

class WidgetStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.years = [];
    this.selectedYear = null;
    this.manufacturers = [];
    this.selectedManufacturer = null;
    this.maxAge = null;
  }


  receiveManufacturersSuccess(manufacturers) {
    this.manufacturers = manufacturers;
    this.emitChange();
  }

  getManufacturers() {
    return this.manufacturers;

  }

  myCustomActionHandler(payload) {
    console.log(payload);
  }

  getYears() {
    return this.years;
  }

  setYears(depth) {

    var currentYear = new Date().getFullYear(),
        firstYear = currentYear - depth,
        last = currentYear + 1;

    this.years = [];
    for (var i = firstYear; i != last; i++) {
      this.years.push(i);
    }
    this.years.reverse();
  }

  getMaxAgeSuccess(maxAge) {
    this.maxAge = parseInt(maxAge, 10);
    console.log(this.maxAge);
    this.setYears(this.maxAge);
    this.emitChange();
  }

}

WidgetStore.storeName = 'WidgetStore';

WidgetStore.handlers = {
  [Actions.RECEIVE_MANUFACTURERS_SUCCESS]: 'receiveManufacturersSuccess',
  [Actions.SELECT_MANUFACTURER_SUCCESS]: 'selectManufacturerSuccess',
  [Actions.RECEIVE_MODELS_SUCCESS]: 'receiveModelsSuccess',
  [Actions.MY_CUSTOM_ACTION_SUCCESS]: 'myCustomActionHandler',
  [Actions.GET_MAXAGE_SUCCESS]: 'getMaxAgeSuccess'
};


export default WidgetStore;