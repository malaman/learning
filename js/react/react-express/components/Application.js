/*globals document*/

import React from 'react';
import Nav from './Nav';
import Home from './Home';
import About from './About';
import ApplicationStore from '../stores/ApplicationStore';
import provideContext from 'fluxible/addons/provideContext';
import connectToStores from 'fluxible/addons/connectToStores';
import { handleHistory } from 'fluxible-router';
import Page from './Page';
import Footer from './Footer';

class Application extends React.Component {


    render() {
        let Handler = this.props.currentRoute.get('handler');
        return (
            <Page selected={this.props.currentPageName} links={this.props.pages}>
                <Handler />
            </Page>
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

export default provideContext(handleHistory(connectToStores(
    Application,
    [ApplicationStore],
    function (stores, props) {
        var appStore = stores.ApplicationStore;
        return {
          currentPageName: appStore.getCurrentPageName(),
          pageTitle: appStore.getPageTitle(),
          pages: appStore.getPages(),
          cupage: appStore.getCurrentPage(),
          path: appStore.getPath()
        };
    }
)));
