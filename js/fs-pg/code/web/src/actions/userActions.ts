import {http} from '../helpers/http';

export const increment = (userId) => ({
    type: 'INCREMENT',
    payload: undefined
});

export const getPosts = (userId) => ({
  type: 'LOAD_USER_POSTS',
  payload: http({ uri: `/api/users/${userId}/posts` })
});
