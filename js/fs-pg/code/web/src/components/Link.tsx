import * as React from 'react';
import {resolve} from 'universal-router';
import {Routes} from '../routes';
import {history} from '../routes/history';

function navigate(path) {
    history.push(path);
}

export function Link({href, children}: {href: string, children?: any}) {
    const click = (e) => {
        e.preventDefault();
        navigate(href);
    };

    return (
        <a href={href} onClick={click}>
            {children}
        </a>
    );
}
