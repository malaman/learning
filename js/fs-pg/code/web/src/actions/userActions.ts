import {http} from '../helpers/http';

export const increment = (userId: string|number) => ({
    type: 'INCREMENT',
    payload: undefined
});

export const getUserInfo = (userId: string|number) => ({
  type: 'LOAD_USER_INFO',
  payload: http({ uri: `/api/users/${userId}` })
});

export const getPosts = (userId: string|number) => ({
  type: 'LOAD_USER_POSTS',
  payload: http({ uri: `/api/users/${userId}/posts` })
});
