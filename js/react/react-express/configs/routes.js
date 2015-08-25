import Home from '../components/Home';
import MakersPage from '../pages/MakersPage';
import MakerPage from '../pages/MakerPage';
import {getMakersAction, getMakerAction} from '../actions/MakersActionCreators';

export default {
  home: {
      path: '/',
      method: 'get',
      page: 'home',
      title: 'Home',
      handler: Home
  },
  about: {
      path: '/about',
      method: 'get',
      page: 'about',
      title: 'About',
      handler: require('../components/About')
  },
  makers: {
      path: '/makers',
      method: 'get',
      page: 'makers',
      title: 'Makers List',
      handler: MakersPage,
      action: getMakersAction
  },
  models: {
      path: '/makers/:makerId',
      method: 'get',
      page: 'models',
      title: 'Models',
      handler: MakerPage,
      action:getMakerAction
  },
  series: {
    path: '/makers/:makerId/:modelId',
      method: 'get',
      page: 'series',
      title: 'Series',
      handler: SeriesPage,
      action:getSeriesAction
  }


};
