import React from 'react';
import CatalogStore from '../stores/CatalogStore';
import provideContext from 'fluxible/addons/provideContext';
import connectToStores from 'fluxible/addons/connectToStores';
import { handleHistory } from 'fluxible-router';
import debugLib from 'debug';

const debug = debugLib('catalog');

var MakersPage = React.createClass({
  displayName: "MakerPage",

  contextTypes : {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
  },


  propTypes : {
    maker: React.PropTypes.object.isRequired,
  },

  render() {

    return (
      <div>
        <h2>Makers page</h2>
        <p>This is Makers Page.</p>
      </div>
    );
    }
});


MakersPage = connectToStores(MakersPage, [CatalogStore], function (stores, props) {
  return {
    makers: stores.CatalogStore.getMakers()
  }
});


export default MakersPage;
