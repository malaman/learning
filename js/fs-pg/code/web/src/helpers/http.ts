

export function http({uri, options = {}, isExternal = false }) {
    const url = 'http://localhost:3030';
    const opts: any = options;
    opts.credentials = 'same-origin';
    return fetch(`${url}${uri}`, options).then(rsp => rsp.json());
}
