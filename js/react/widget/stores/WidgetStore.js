import BaseStore from 'fluxible/addons/BaseStore';

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
  }

  getManufacturers() {
    return this.manufacturers;
  }

  myCustomActionHandler(payload) {
    console.log(payload);
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

  getYears() {
    return this.years;
  }

  getMaxAgeSuccess(maxAge) {
    this.maxAge = parseInt(maxAge, 10);
    console.log(this.maxAge);
    this.setYears(this.maxAge);
  }

}

WidgetStore.storeName = 'WidgetStore';

WidgetStore.handlers = {
  'RECEIVE_MANUFACTURERS_SUCCESS': 'receiveManufacturersSuccess',
  'SELECT_MANUFACTURER_SUCCESS': 'selectManufacturerSuccess',
  'RECEIVE_MODELS_SUCCESS': 'receiveModelsSuccess',
  'MY_CUSTOM_ACTION_SUCCESS': 'myCustomActionHandler',
  'GET_MAXAGE_SUCCESS': 'getMaxAgeSuccess'
};


export default WidgetStore;