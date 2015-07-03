

export default function getManufacturersAction(actionContext, payload) {
  actionContext.dispatch('RECEIVE_MANUFACTURERS_SUCCESS', getManufacturers(payload));
}



function getManufacturers(payload) {
  return [1,2,3,4,5,6,7];
}