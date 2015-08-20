import React from 'react';
import CatalogStore from '../stores/CatalogStore';
import provideContext from 'fluxible/addons/provideContext';
import connectToStores from 'fluxible/addons/connectToStores';
import { handleHistory } from 'fluxible-router';
import debugLib from 'debug';
import {year} from '../configs/general';

const debug = debugLib('catalog');

let MakersPage = React.createClass({
  displayName: "MakerPage",

  contextTypes : {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
  },

  propTypes : {
    models: React.PropTypes.array.isRequired
  },

  render() {
    return (
      <div>
        <h2>Makers page</h2>
        <p>This is Makers Page.</p>
      {this.props.models}
      </div>
    );
    }
});


MakersPage = connectToStores(MakersPage, [CatalogStore], function (stores, props) {
  return {
    models: stores.CatalogStore.getModels()
  }
});


export default MakersPage;
