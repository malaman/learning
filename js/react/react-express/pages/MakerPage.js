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

let MakersPage = React.createClass({
  displayName: "MakerPage",

  contextTypes : {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
  },

  propTypes : {
    models: React.PropTypes.array.isRequired,
    currentMaker: React.PropTypes.string.isRequired
  },

  render() {
    let {models} = this.props;
    let path = this.context.getStore(ApplicationStore).getPath();
    path = path.replace(':makerId', this.props.currentMaker);
    console.log(this.props.currentMaker);
    models = models.map(model => {
      let url = `${path}/${model.id}`;
      return (<CatalogLink key={model.id} entity = {model} url = {url}/>)
    });

    return (
      <div>
        <h2>Models page</h2>
        <p>This is a Models Page.</p>
        <ul>
        {models}
        </ul>
      </div>
    );
    }
});


MakersPage = connectToStores(MakersPage, [CatalogStore], function (stores, props) {
  return {
    models: stores.CatalogStore.getModels(),
    currentMaker: stores.CatalogStore.getCurrentMaker()
  }
});


export default MakersPage;
