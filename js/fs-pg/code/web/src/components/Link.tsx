import * as React from 'react';
import {resolve} from 'universal-router';
import {history} from '../routes/history';

export function Link(props: {href: string, children?: any}) {
    const click = (e) => {
        e.preventDefault();
        history.push(props.href);
    };
    return (
        <a role='button' href={props.href} onClick={click}>
            {props.children}
        </a>
    );
}
