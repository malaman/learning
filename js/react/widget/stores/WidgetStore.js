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

  getSelectedYear() {
    return this.selectedYear;
  }

  getSelectedManufacturer() {
    return this.seletedManufacturer;

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
    this.years = this.years.map(item => {
      return {key: item, value: item}
    });
  }

  getMaxAgeSuccess(maxAge) {
    this.maxAge = parseInt(maxAge, 10);
    console.log(this.maxAge);
    this.setYears(this.maxAge);
    if (this.selectedYear === null) {
      this.selectedYear = this.years[0];
    }
    this.emitChange();
  }

  setSelectedYear(year) {
    this.selectedYear = year;
    this.emitChange();
  }

  setSelectedManufacturer(manufacturer) {
    this.selectedManufacturer = manufacturer;
    this.emitChange();
  }

  getManufacturersSuccess(manufacturers) {
    var manufacturers = JSON.parse(manufacturers),
        options = manufacturers.map(item => {
          return {key: item.id, value: item.ru_name};
        });
    this.manufacturers = options;
    this.emitChange();
  }
}

WidgetStore.storeName = 'WidgetStore';

WidgetStore.handlers = {
  [Actions.GET_MANUFACTURERS_SUCCESS]: 'getManufacturersSuccess',
  [Actions.SELECT_MANUFACTURER_SUCCESS]: 'selectManufacturerSuccess',
  [Actions.RECEIVE_MODELS_SUCCESS]: 'receiveModelsSuccess',
  [Actions.MY_CUSTOM_ACTION_SUCCESS]: 'myCustomActionHandler',
  [Actions.GET_MAXAGE_SUCCESS]: 'getMaxAgeSuccess',
  [Actions.YEAR_CHANGED_SUCCESS]: 'setSelectedYear'
};


export default WidgetStore;