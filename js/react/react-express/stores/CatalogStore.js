import BaseStore from 'fluxible/addons/BaseStore';

import debugLib from 'debug';
const debug = debugLib('catalog');

class CatalogStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.makers = [];
    this.currentMaker = null;
    this.models = [];
    this.currentModel = null

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

  getCurrentMaker() {
    return this.currentMaker;
  }

  getCurrentModel() {
    return this.currentModel;
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

  dehydrate() {
    return {
      makers: this.makers,
      currentMaker: this.currentMaker,
      models: this.models,
      currentModel: this.currentModel,
      series: this.series

    };
  }
  rehydrate(state) {
    this.makers = state.makers;
    this.models = state.models;
    this.currentMaker = state.currentMaker;
    this.currentModel = state.currentModel;
    this.series = state.series;
  }

}

CatalogStore.storeName = 'CatalogStore';
CatalogStore.handlers = {
  'LOAD_MAKERS_LIST': 'handleMakersList',
  'LOAD_MODELS_LIST': 'handleModelsList',
  'LOAD_SERIES_LIST': 'handleSeriesList'
};

export default CatalogStore;
