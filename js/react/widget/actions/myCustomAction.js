export default function myCustomAction(actionContext, payload) {
  actionContext.dispatch('MY_CUSTOM_ACTION_SUCCESS', payload);
}
