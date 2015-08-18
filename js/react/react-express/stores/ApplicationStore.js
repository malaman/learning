import BaseStore from 'fluxible/addons/BaseStore';
import routesConfig from '../configs/routes';
import RouteStore from './RouteStore';

import debugLib from 'debug';
const debug = debugLib('catalog');

class ApplicationStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.currentPageName = null;
        this.currentPage = null;
        this.pages = routesConfig;
        this.pageTitle = '';
        this.makers = [];
    }

    handlePageTitle(currentRoute) {
        var self = this;
        this.dispatcher.waitFor(RouteStore, function () {
            if (currentRoute && currentRoute.get('title')) {
                self.pageTitle = currentRoute.get('title');
                self.emitChange();
            }
        });
    }
    getCurrentPageName() {
        return this.currentPageName;
    }
    getPageTitle() {
        return this.pageTitle;
    }
    getPages() {
        return this.pages;
    }
    getMakers() {
        return this.makers;
    }
    handleMakersList(data) {
      this.makers = data;
      debug('Store received data');
      this.emitChange();
    }

    dehydrate() {
        return {
            currentPageName: this.currentPageName,
            currentPage: this.currentPage,
            pages: this.pages,
            pageTitle: this.pageTitle,
            makers: this.makers
        };
    }
    rehydrate(state) {
        this.currentPageName = state.currentPageName;
        this.currentPage = state.currentPage;
        this.pages = state.pages;
        this.pageTitle = state.pageTitle;
        this.makers = state.makers;
    }

}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
    'NAVIGATE_SUCCESS': 'handlePageTitle',
    'LOAD_MAKERS_LIST': 'handleMakersList'
};

export default ApplicationStore;
