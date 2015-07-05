/*globals document*/

import React from 'react';
import Nav from './Nav';
import Home from './Home';
import About from './About';
import ApplicationStore from '../stores/ApplicationStore';
import WidgetStore from '../stores/WidgetStore'
import provideContext from 'fluxible/addons/provideContext';
import connectToStores from 'fluxible/addons/connectToStores';
import { handleHistory } from 'fluxible-router';
import getManufacturersAction from '../actions/getManufacturers'

class Application extends React.Component {
    render() {
        var Handler = this.props.currentRoute.get('handler');
        return (
            <div>
                <Nav selected={this.props.currentPageName} links={this.props.pages} />
                <Handler/>
            </div>
        );
    }


    componentDidUpdate(prevProps, prevState) {
        const newProps = this.props;
        if (newProps.pageTitle === prevProps.pageTitle) {
            return;
        }
        document.title = newProps.pageTitle;
    }
}


// wrap with history handler


export default handleHistory(provideContext(connectToStores(
    Application,
    [ApplicationStore, WidgetStore],
    function (stores, props) {
        var appStore = stores.ApplicationStore;
        var widgetStore = stores.WidgetStore;
        return {
            currentPageName: appStore.getCurrentPageName(),
            pageTitle: appStore.getPageTitle(),
            pages: appStore.getPages(),
            years: widgetStore.getYears(),
            manufacturers: widgetStore.getManufacturers()
        };
    }
)));
