import * as React from 'react';
import { connect } from 'react-redux';
import Miss from 'react-router/Miss';

import {Header} from '../components/Header';


interface AppProps {
    routes: any;
    pathname: any;
    location: {
        pathname: string
    };
}

class AppClass extends React.Component<AppProps, {}> {
    render() {
        const {routes}: any = this.props;
        return (
            <div>
                <Header {...this.props} />
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
    };
}

export const App = connect(
    mapStateToProps
)(AppClass);
