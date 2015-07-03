var Promise = require('promise');
var request = require('superagent-promise')(require('superagent'), Promise);


export default function getMaxAgeAction(actionContext, payload) {
    return getMaxAge().then(function(response) {
      actionContext.dispatch('GET_MAXAGE_SUCCESS', response.text);
    })
};


function getMaxAge() {
  return request('GET', 'http://etachki.com/api/getMaxAge');
}
