interface UserState {
    posts: Array<any>;
    info: {
        username: string,
        name: string,
        email: string
    };
    saveStatus: {
        isSaved: boolean,
        isFailed: boolean
    };
}

const initialState: UserState = {
    posts: [],
    info: {
        username: '',
        name: '',
        email: ''
    },
    saveStatus: {isSaved: false, isFailed: false}
  };


function getPosts(state, payload) {
    return (Object as any).assign(state, {posts: payload});
}

export default function user(state = initialState, action): UserState {
    switch (action.type) {
        case 'LOAD_USER_INFO_FULFILLED':
            return (Object as any).assign(state, {user: action.payload});
        case 'LOAD_USER_POSTS_FULFILLED':
          return getPosts(state, action.payload);
        default:
            return state;
    }
}
