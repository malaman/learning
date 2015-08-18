import React from 'react';
import ApplicationStore from '../stores/ApplicationStore';
import provideContext from 'fluxible/addons/provideContext';
import connectToStores from 'fluxible/addons/connectToStores';
import { handleHistory } from 'fluxible-router';
import debugLib from 'debug';

const debug = debugLib('catalog');

var MakersPage = React.createClass({
    displayName: "MakersPage",

    contextTypes : {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    },

    render() {
        debug('info from render' + this.context.getStore(ApplicationStore).getMakers());

        return (
            <div>
                <h2>Makers page</h2>
                <p>This is Makers Page.</p>
            {this.context.getStore(ApplicationStore).getMakers()}
            </div>
        );
    }
});


//MakersPage = provideContext(connectToStores(MakersPage, [ApplicationStore], function (stores, props) {
//    return {
//        makers: stores.ApplicationStore.getMakers()
//    }
//}));


export default MakersPage;
