import * as React from 'react';

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
          return <div />;
      }
    },
    {
      path: '/user',
      action: (args) => {
          return args.dispatch(getUserInfo('5852c646d76bdb0063dc8d84'))
            .then(() => {
                return <AccountData />
            })
            .catch((err) => console.log(`err ${err}`));
      }
    },
    {
      path: '/about',
      action: () => {
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
            return (
                <div>
                    <Header />
                    {this.state.component}
                </div>
            );
        }
}

export const Routes = RoutesClass;
