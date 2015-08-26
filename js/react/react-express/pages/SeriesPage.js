import React from 'react';
import CatalogStore from '../stores/CatalogStore';
import ApplicationStore from '../stores/ApplicationStore';
import provideContext from 'fluxible/addons/provideContext';
import connectToStores from 'fluxible/addons/connectToStores';
import { handleHistory } from 'fluxible-router';
import debugLib from 'debug';
import {year} from '../configs/general';
import CatalogLink from '../components/CatalogLink';

const debug = debugLib('catalog');

let SeriesPage = React.createClass({
  displayName: "MakerPage",

  contextTypes : {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
  },

  propTypes : {
    models: React.PropTypes.array.isRequired
  },

  render() {
    let {series} = this.props;
    let path = this.context.getStore(ApplicationStore).getPath();
    path = path.replace(':makerId', this.props.currentMaker).replace(':modelId', this.props.currentModel);
    series = series.map(seria => {
      let url = `${path}/${seria.id}`;
      return (<CatalogLink key={seria.id} entity = {seria} url = {url}/>)
    });

    return (
      <div>
        <h2>Series page</h2>
        <p>This is a Series Page.</p>
        <ul>
        {series}
        </ul>
      </div>
    );
    }
});


SeriesPage = connectToStores(SeriesPage, [CatalogStore], function (stores, props) {
  return {
    series: stores.CatalogStore.getSeries(),
    currentMaker: stores.CatalogStore.getCurrentMaker(),
    currentModel: stores.CatalogStore.getCurrentModel()
  }
});


export default SeriesPage;
