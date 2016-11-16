import React from 'react';
import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';

import App from '../containers/App';
import Home from '../pages/Home';
import About from '../pages/About';

/**
 * global routing configuration
 */
const routes = [
  { pattern: '/',
    component: App,
    routes: [
      { pattern: '/',
        component: Home,
        exactly: true
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
