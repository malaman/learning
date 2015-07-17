import BaseStore from 'fluxible/addons/BaseStore';
import Actions from "../constants/Actions";
import Settings from '../constants/Settings';

class WidgetStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.step = 1;

    this.years = [];
    this.manufacturers = [];
    this.models = [];
    this.series = [];
    this.modifications = [];
    this.regions = [];
    this.email = null;

    this.maxAge = null;
    this.selectedYear = null;
    this.selectedManufacturer = {value: null, text: null};
    this.selectedModel = {value: null, text: null};
    this.selectedSeria = {value: null, text: null};
    this.selectedModification = {value: null, text: null};
    this.selectedRegion = {value: null, text: null};
    this.estimation = {};

    this.odometer = null;
  }

  getStep() {
    return this.step;
  }
  getYears() {
    return this.years;
  }

  getManufacturers() {
    return this.manufacturers;
  }

  getModels() {
    return this.models
  }

  getSeries() {
    return this.series;
  }

  getModifications() {
    return this.modifications;
  }

  getSelectedYear() {
    return this.selectedYear;
  }

  getRegions() {
    return this.regions;
  }

  getSelectedManufacturer() {
    return this.selectedManufacturer;
  }

  getSelectedModel() {
    return this.selectedModel;
  }

  getSelectedSeria() {
    return this.selectedSeria;
  }

  getSelectedModification() {
    return this.selectedModification;
  }

  getSelectedRegion() {
    return this.selectedRegion;
  }

  getOdometer() {
    return this.odometer;
  }

  getEmail() {
    return this.email;
  }

  getEstimation() {
    return this.estimation;
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

  getManufacturersSuccess(data) {
     this.manufacturers = JSON.parse(data).map(item => {
       return {value: item.id, text: item.ru_name};
     });
    this.manufacturers.unshift({value: 0, text: Settings.customStrings.PLEASE_SELECT_MANUFACTURER});
    if (this.selectedManufacturer.value === null) {
      this.selectedManufacturer = this.manufacturers[0];
    }
    this.emitChange();
  }

  getModelsSuccess(data) {
    this.models = JSON.parse(data).map(item => {
      return {value: item.id, text: item.ru_name};
    });
    this.models.unshift({value: 0, text: Settings.customStrings.PLEASE_SELECT_MODEL});
    if (this.selectedModel.value === null) {
      this.selectedModel = this.models[0];
    }
    this.emitChange();
  }

  getSeriesSuccess(data) {
    this.series = JSON.parse(data).map(item => {
      return {value: item.id, text: item.ru_name}
    });
    this.series.unshift({value: 0, text: Settings.customStrings.SELECT_SERIA});
    this.modifications.unshift({value: 0, text: Settings.customStrings.SELECT_MODIFICATION});
    if (this.selectedSeria.value === null) {
      this.selectedSeria = this.series[0];
    }
    this.emitChange();
  }

  getModificationsSuccess(data) {
    this.modifications = JSON.parse(data).map(item => {
      return {value: item.id, text: item.ru_name}
    });
    this.modifications.unshift({value: 0, text: Settings.customStrings.SELECT_MODIFICATION});
    if (this.selectedModification.value === null) {
      this.selectedModification = this.modifications[0];
    }
    this.emitChange();
  }

  getAllRegionsSuccess(data) {
    this.regions = JSON.parse(data).regions.map(item => {
      return {value: item.id, text: item.ru}
    });
    this.regions.unshift({value: 0, text: Settings.customStrings.SELECT_REGION});
    if (this.selectedRegion.value === null) {
      this.selectedRegion = this.modifications[0];
    }
    this.emitChange();
  }


  setStep(step) {
    this.step = step;
    this.emitChange()
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
      return {value: item, text: item}
    });
    this.years.unshift({value: 0, text: Settings.customStrings.PLEASE_SELECT_YEAR});
    this.models.unshift({value: 0, text: Settings.customStrings.PLEASE_SELECT_MODEL});
    this.selectedModel = this.models[0];
  }

  setSelectedYear(year) {
    this.selectedYear = year;
    this.emitChange();
  }

  setSelectedManufacturer(index) {
    this.selectedManufacturer = this.manufacturers[index];
    this.emitChange();
  }

  setSelectedModel(index) {
    this.selectedModel = this.models[index];
    this.emitChange();
  }

  setSelectedSeria(index) {
    this.selectedSeria = this.series[index];
    this.emitChange();
  }

  setSelectedModification(index) {
    this.selectedModification = this.modifications[index];
    this.emitChange();
  }

  setSelectedRegion(index) {
    this.selectedRegion = this.regions[index];
    this.emitChange();
  }

  setOdometer(odometer) {
    this.odometer = odometer;
    this.emitChange();
  }

  setEmail(email) {
    this.email = email;
    this.emitChange();
  }

  determinePrice(response) {
    this.estimation = JSON.parse(response);
    this.emitChange();
  }
}

WidgetStore.storeName = 'WidgetStore';

WidgetStore.handlers = {
  [Actions.GET_MANUFACTURERS_SUCCESS]: 'getManufacturersSuccess',
  [Actions.GET_ALL_ACTIVE_MANUFACTURERS_SUCCESS]: 'getManufacturersSuccess',
  [Actions.GET_MAXAGE_SUCCESS]: 'getMaxAgeSuccess',
  [Actions.GET_MODELS_SUCCESS]: 'getModelsSuccess',
  [Actions.GET_SERIES_SUCCESS]: 'getSeriesSuccess',
  [Actions.GET_MODIFICATIONS_SUCCESS]: 'getModificationsSuccess',
  [Actions.GET_ALL_REGIONS_SUCCESS]: 'getAllRegionsSuccess',
  [Actions.YEAR_CHANGED_SUCCESS]: 'setSelectedYear',
  [Actions.MANUFACTURER_CHANGED_SUCCESS]: 'setSelectedManufacturer',
  [Actions.MODEL_CHANGED_SUCCESS]: 'setSelectedModel',
  [Actions.STEP_CHANGED_SUCCESS]: 'setStep',
  [Actions.SERIA_CHANGED_SUCCESS]: 'setSelectedSeria',
  [Actions.MODIFICATION_CHANGED_SUCCESS]: 'setSelectedModification',
  [Actions.REGION_CHANGED_SUCCESS]: 'setSelectedRegion',
  [Actions.ODOMETER_CHANGED_SUCCESS]: 'setOdometer',
  [Actions.EMAIL_CHANGED_SUCCESS]: 'setEmail',
  [Actions.DETERMINE_PRICE_SUCCESS]: 'determinePrice'
};


export default WidgetStore;