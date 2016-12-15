import * as historyPackage from 'history';

export const history: any = typeof window === 'object'
    ? (historyPackage as any).createBrowserHistory()
    : {};
