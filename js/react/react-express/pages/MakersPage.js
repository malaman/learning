import React from 'react';
import CatalogStore from '../stores/CatalogStore';
import ApplicationStore from '../stores/ApplicationStore';

import provideContext from 'fluxible/addons/provideContext';
import connectToStores from 'fluxible/addons/connectToStores';
import { handleHistory } from 'fluxible-router';
import debugLib from 'debug';
import CatalogLink from '../components/CatalogLink';

const debug = debugLib('catalog');

var MakersPage = React.createClass({
    displayName: "MakersPage",

    contextTypes : {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    },


    render() {
      let {makers} = this.props;
      let path = this.context.getStore(ApplicationStore).getPath();

      makers = makers.map(maker => {
        let url = `catalog/${maker.id}`;
        return (<CatalogLink key={maker.id} entity = {maker} url = {url}/>)
      });
      return (
          <div>
              <h2>Makers page</h2>
              <p>This is Makers Page.</p>
          <ul>
            {makers}
          </ul>
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
