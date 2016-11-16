const initialState = {
  home: 'HOME CONTENT',
  about: 'ABOUT CONTENT',
  counter: 0
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {...state, counter: state.counter + 1};
    default:
      return state;
  }
}
