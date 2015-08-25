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
    this.path = ''

  }

  handlePageTitle(currentRoute) {
      var self = this;
      this.dispatcher.waitFor(RouteStore, function () {
          if (currentRoute && currentRoute.get('title')) {
            self.pageTitle = currentRoute.get('title');
            self.currentPage = currentRoute.get('page');
            self.path = currentRoute.get('path');
            self.emitChange();
          }
      });
  }
  getCurrentPageName() {
      return this.currentPageName;
  }
  getCurrentPage() {
    return this.currentPage
  }
  getPageTitle() {
      return this.pageTitle;
  }
  getPages() {
      return this.pages;
  }
  getPath() {
    return this.path;
  }

  dehydrate() {
      return {
        currentPageName: this.currentPageName,
        currentPage: this.currentPage,
        pages: this.pages,
        pageTitle: this.pageTitle,
        path: this.path
      };
  }
    rehydrate(state) {
      this.currentPageName = state.currentPageName;
      this.currentPage = state.currentPage;
      this.pages = state.pages;
      this.pageTitle = state.pageTitle;
      this.path = state.path;
    }

}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
    'NAVIGATE_SUCCESS': 'handlePageTitle'
};

export default ApplicationStore;
