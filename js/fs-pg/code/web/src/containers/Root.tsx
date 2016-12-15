import * as React from 'react';
import { Provider } from 'react-redux';
// import {DevTools} from './DevTools.js';
import {Routes} from '../routes';
import {Header} from '../components/Header';

interface RootProps {
    location: {pathname: string};
    store: Object;
    component: React.ReactNode;
}

export class Root extends React.Component<RootProps, {}> {
    render() {
        console.log('root props', this.props);
        const {store}: any = this.props;
        return (
            <Provider store={store}>
                <div>
                    <Header location={this.props.location} />
                    {this.props.component}
                </div>
            </Provider>
        );
    }
};
