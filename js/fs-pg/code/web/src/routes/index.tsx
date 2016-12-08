import * as React from 'react';
import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';

import App from '../components/App';
import Home from '../pages/Home';
import About from '../pages/About';
import User from '../pages/User';
import AccountData from '../pages/User/AccountData';

/**
 * global routing configuration
 */
const routes: Array<any> = [
    { pattern: '/',
        component: App,
        routes: [
            { pattern: '/',
                component: User,
                exactly: true,
                routes: [
                    { pattern: '/user/info',
                      component: AccountData,
                    },
                ]
            },
            { pattern: '/about',
                component: About,
            }
        ]
    }
];

/**
 * wrapper around react-router-v4 Match component to enable global routing config
 * @param route
 * @constructor
 */
export const MatchWithSubRoutes = (route) => (
    <Match {...route} render={(props) => (<route.component {...props} routes={route.routes} />)} />
);

export default () => {
    return (
        <Router>
            <div>
                {routes.map((route, i) => <MatchWithSubRoutes key={i} {...route} />)}
            </div>
        </Router>
    );
};
