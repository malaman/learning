import * as React from "react";
import * as ReactDOM from "react-dom";
import './styles/main.scss';
import { Root } from './containers/Root';

import { configureStore } from './store/configureStore';

const store: Object = configureStore({});

const Demo = ({name} : {name: string}) => {
    return <div>Hello {name}!</div>;
};

ReactDOM.render(
    <Root store={store} />,
    document.getElementById("root")
);
