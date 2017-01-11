import * as React from 'react';
import { Provider } from 'react-redux';
import {Header} from '../components/Header/index';

interface RootProps {
    location: {pathname: string};
    store: Object;
    component: React.Component<any, any>;
}

export class Root extends React.Component<RootProps, {}> {
    render() {
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
