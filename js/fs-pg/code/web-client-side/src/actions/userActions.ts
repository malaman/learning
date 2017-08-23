import {http} from '../helpers/http';

export const increment = (userId: string|number) => ({
    type: 'INCREMENT',
    payload: undefined
});

export const getUserInfo = (username: string) => ({
  type: 'LOAD_USER_INFO',
  payload: http({ uri: `/api/users/${username}` })
});

export const getPosts = (userId: string|number) => ({
  type: 'LOAD_USER_POSTS',
  payload: http({ uri: `/api/users/${userId}/posts` })
});
