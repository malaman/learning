import * as React from 'react';
import { Provider } from 'react-redux';
import {DevTools} from './DevTools.js';
import Routes from '../routes';

interface RootProps {
    store: Object;
}

export class Root extends React.Component<RootProps, {}> {
    render() {
        const {store}: any = this.props;
        return (
            <Provider store={store}>
                <div>
                    <DevTools />
                    <Routes />
                </div>
            </Provider>
        );
    }
};
