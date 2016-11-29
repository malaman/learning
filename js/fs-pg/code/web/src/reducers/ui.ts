const initialState = {
    home: 'HOME CONTENT',
    about: 'ABOUT CONTENT',
    counter: 0
};

export default function user(state = initialState, action): any {
    switch (action.type) {
        case 'INCREMENT':
            const {home, about} = state;
            return {home, about, counter: state.counter + 1};
        default:
            return state;
    }
}
