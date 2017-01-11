import * as React from 'react';
import { connect } from 'react-redux';
import {Header} from './Header';

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
            <div className='app'>
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
