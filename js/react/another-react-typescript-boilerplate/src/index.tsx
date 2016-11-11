import * as React from "react";
import * as ReactDOM from "react-dom";
import * as classnames from 'classnames';

const Demo = ({name} : {name: string}) => {
    const cssClass: any = classnames('some-class');
    return <div className='cssClass'>Hello {name}!</div>;
};

ReactDOM.render(
    <Demo name="World" />,
    document.getElementById("root")
);
