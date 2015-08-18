import BaseStore from 'fluxible/addons/BaseStore';

import debugLib from 'debug';
const debug = debugLib('catalog');

class CatalogStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.makers = [];
    }

    getMakers() {
        return this.makers;
    }
    handleMakersList(data) {
      this.makers = data;
      this.emitChange();
    }

    dehydrate() {
        return {
            makers: this.makers,
        };
    }
    rehydrate(state) {
        this.makers = state.makers;
    }

}

CatalogStore.storeName = 'CatalogStore';
CatalogStore.handlers = {
    'LOAD_MAKERS_LIST': 'handleMakersList'
};

export default CatalogStore;
