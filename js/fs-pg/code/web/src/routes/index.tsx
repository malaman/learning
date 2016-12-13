import * as React from 'react';
import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';

import {App} from '../components/App';
import {Home} from '../pages/Home';
import {About} from '../pages/About';
import {User} from '../pages/User';
import {AccountData} from '../pages/User/AccountData';
import * as UniversalRouter from 'universal-router';
import {Header} from '../components/Header';

import {getUserInfo} from '../actions/userActions';

export const routes: any[] = [
    {
      path: '/',
      action: () => {
          console.log('/');
          return <div />;
      }
    },
    {
      path: '/user',
      action: (args) => {
          return args.dispatch(getUserInfo('584ed722d1cdc6034b0f0e9b'))
            .then(() => <AccountData />)
            .catch((err) => console.log(`err ${err}`));
      }
    },
    {
      path: '/about',
      action: () => {
          console.log('about');
          return <About />;
      }
    }
];

interface RoutesClassProps {
    getState: Function;
    dispatch: Function;
    location: {
        pathname: string,
    };
}

class RoutesClass extends React.Component<RoutesClassProps, {}> {
    state = {
        isRouteResolved: false,
        component: <div />
    };


    resolve() {
        UniversalRouter
        .resolve(routes, {path: this.props.location.pathname, dispatch: this.props.dispatch})
        .then((component) => {
            this.setState({
                isRouteResolved: true,
                component: component
            });
        });
    }

    componentDidMount() {
        this.resolve();
    }

    componentWillReceiveProps(nextProps) {
        this.resolve();
    }

    render() {
        if (this.state.isRouteResolved) {
            return (
                <div>
                    <Header />
                    {this.state.component}
                </div>
            );
        }
        return null;
    }
}

export const Routes = RoutesClass;
