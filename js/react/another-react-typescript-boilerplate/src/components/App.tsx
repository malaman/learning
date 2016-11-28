import * as React from 'react';
import { connect } from 'react-redux';
import Miss from 'react-router/Miss';

 import Header from '../components/Header';
// import Footer from '../components/Footer';
// import NotFound from '../components/NotFound';
import {MatchWithSubRoutes} from '../routes';


interface AppProps {
    routes: any;
    pathname: any;
    location: Object;
}

class App extends React.Component<AppProps, {}> {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

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

export default connect(
    mapStateToProps
)(App);
