import BaseStore from 'fluxible/addons/BaseStore';

import debugLib from 'debug';
const debug = debugLib('catalog');

class CatalogStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.makers = [];
    this.currentMaker = null;
    this.models = [];
    this.currentModel = null;
    this.series = [];
    this.currentSeria = null;

  }

  getMakers() {
    return this.makers;
  }

  getModels() {
    return this.models;
  }

  getSeries() {
    return this.series;
  }

  getModifications() {
    return this.modifications;
  }

  getCurrentMaker() {
    return this.currentMaker;
  }

  getCurrentModel() {
    return this.currentModel;
  }

  getCurrentSeria() {
    return this.currentSeria;
  }

  getCurrentModification() {
    return this.currentModification;
  }

  handleMakersList(data) {
    this.makers = data;
    this.emitChange();
  }

  handleModelsList({data, manufacturer}) {
    this.currentMaker = manufacturer;
    this.models = data;
    this.emitChange();
  }

  handleSeriesList({data, manufacturer, model}) {
    this.currentMaker = manufacturer;
    this.currentModel = model;
    this.series = data;
    this.emitChange();
  }

  handleModificationsList({data, manufacturer, model, seria}) {
    this.currentMaker = manufacturer;
    this.currentModel = model;
    this.currentSeria = seria;
    this.modifications = data;
    this.emitChange()
  }


  dehydrate() {
    return {
      makers: this.makers,
      currentMaker: this.currentMaker,
      models: this.models,
      currentModel: this.currentModel,
      series: this.series,
      currentSeria: this.currentSeria,
      modifications: this.modifications,
      currentModifiction: this.currentModification
    };
  }
  rehydrate(state) {
    this.makers = state.makers;
    this.models = state.models;
    this.currentMaker = state.currentMaker;
    this.currentModel = state.currentModel;
    this.series = state.series;
    this.currentSeria = state.currentSeria;
    this.modifications = state.modifications;
    this.currentModification = state.currentModification;
  }

}

CatalogStore.storeName = 'CatalogStore';
CatalogStore.handlers = {
  'LOAD_MAKERS_LIST': 'handleMakersList',
  'LOAD_MODELS_LIST': 'handleModelsList',
  'LOAD_SERIES_LIST': 'handleSeriesList',
  'LOAD_MODIFICATIONS_LIST': 'handleModificationsList'
};

export default CatalogStore;
