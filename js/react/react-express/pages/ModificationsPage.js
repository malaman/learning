import React from 'react';
import CatalogStore from '../stores/CatalogStore';
import ApplicationStore from '../stores/ApplicationStore';
import provideContext from 'fluxible/addons/provideContext';
import connectToStores from 'fluxible/addons/connectToStores';
import { handleHistory } from 'fluxible-router';
import debugLib from 'debug';
import {year} from '../configs/general';
import CatalogLink from '../components/CatalogLink';
import Modification from '../components/Modification';
import {imgRoot} from '../configs/general';

const debug = debugLib('catalog');

let ModificationsPage = React.createClass({
  displayName: "ModificationsPage",

  contextTypes : {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
  },

  propTypes : {
    modifications: React.PropTypes.array.isRequired,
    currentMaker: React.PropTypes.string.isRequired,
    currentModel: React.PropTypes.string.isRequired
  },

  render() {
    let {modifications} = this.props;
    modifications = modifications.map(modification => {
      let imgUrl = `${imgRoot}${modification.src}`;
      return (<Modification key={modification.id} info = {modification.ru_name}
        imgUrl = {imgUrl} alt={modification.alt}/>)
    });

    return (
      <div>
        <h2>Modifications page</h2>
        <p>This is a Modification Page.</p>
        {modifications}
      </div>
    );
    }
});


ModificationsPage = connectToStores(ModificationsPage, [CatalogStore], function (stores, props) {
  return {
    modifications: stores.CatalogStore.getModifications(),
    currentMaker: stores.CatalogStore.getCurrentMaker(),
    currentModel: stores.CatalogStore.getCurrentModel(),
    currentSeria: stores.CatalogStore.getCurrentSeria()
  }
});

export default ModificationsPage;
