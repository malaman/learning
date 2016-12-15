import * as React from "react";
import * as ReactDOM from "react-dom";
import './styles/main.scss';
import { Root } from './containers/Root';

import { configureStore } from './store/configureStore';
import {history} from './routes/history';
import * as UniversalRouter from 'universal-router';
import {routes} from './routes';

const store: {dispatch: Function} = configureStore({});

const Demo = ({name} : {name: string}) => {
    return <div>Hello {name}!</div>;
};

function render(location: any) {
    console.log('render', location);
    UniversalRouter
        .resolve(routes, {path: location.pathname, dispatch: store.dispatch})
        .then((component) => {
            const ReactComp = (component as React.ReactNode);
            ReactDOM.render(<Root store={store} location={location} component={ReactComp} />, document.getElementById("root"));
    });

}
history.listen(render);
