import BaseStore from 'fluxible/addons/BaseStore';

import debugLib from 'debug';
const debug = debugLib('catalog');

class CatalogStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.makers = [];
    this.models = [];

  }

  getMakers() {
    return this.makers;
  }

  getModels() {
    return this.models;
  }

  handleMakersList(data) {
    this.makers = data;
    this.emitChange();
  }

  handleModelsList(data) {
    console.log(data);
    this.models = data;
    this.emitChange();
  }

  dehydrate() {
    return {
      makers: this.makers,
      models: this.models
    };
  }
  rehydrate(state) {
    this.makers = state.makers;
    this.models = state.models;
  }

}

CatalogStore.storeName = 'CatalogStore';
CatalogStore.handlers = {
  'LOAD_MAKERS_LIST': 'handleMakersList',
  'LOAD_MODELS_LIST': 'handleModelsList'
};

export default CatalogStore;
