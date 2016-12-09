import * as React from 'react';
import { connect } from 'react-redux';
import Miss from 'react-router/Miss';

 import {Header} from '../components/Header';
import {MatchWithSubRoutes} from '../routes';


interface AppProps {
    routes: any;
    pathname: any;
    location: {
        pathname: string
    };
}

class AppClass extends React.Component<AppProps, {}> {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    componentDidMount() {
        if (this.props.location.pathname === '/') {
          this.context.router.transitionTo('/user');
        }
    }

    render() {
        const {routes} : any = this.props;
        return (
            <div>
                <Header {...this.props} />
                {routes.map((route, i) => <MatchWithSubRoutes key={i} {...route} />)}
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
