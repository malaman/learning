export default {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        title: 'Home',
        handler: require('../components/Home')
    },
    about: {
        path: '/about',
        method: 'get',
        page: 'about',
        title: 'About',
        handler: require('../components/About')
    },
    widget: {
        path: '/widget',
        method: 'get',
        page: 'widget',
        title: 'Widget',
        handler: require('../components/Widget')
    },
    widgetStep2: {
        path: '/widget/:id',
        method: 'get',
        page: 'widgetStep2',
        title: 'Step-2',
        handler: require('../components/WidgetStep2')
    }


};
