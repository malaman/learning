import * as React from 'react';

import {App} from '../components/App';
import {Home} from '../pages/Home';
import {About} from '../pages/About';
import {User} from '../pages/User';
import {AccountData} from '../pages/User/AccountData';
import * as UniversalRouter from 'universal-router';
import {Header} from '../components/Header/index';

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
      return args.dispatch(getUserInfo('Bret'))
        .then(() => {
          return <AccountData />;
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
