import * as React from "react";
import * as ReactDOM from "react-dom";
import './styles/main.scss';
import { Root } from './containers/Root';

import { configureStore } from './store/configureStore';
import {history} from './routes/history';

const store: Object = configureStore({});

const Demo = ({name} : {name: string}) => {
    return <div>Hello {name}!</div>;
};

function render(location) {
    console.log('render', location);
    ReactDOM.render(
        <Root store={store} location={location}/>,
        document.getElementById("root")
    );
}
history.listen(render);
render(window.location.pathname);
