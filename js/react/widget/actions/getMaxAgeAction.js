var Promise = require('promise');
var request = require('superagent-promise')(require('superagent'), Promise);


export default function getMaxAgeAction(actionContext, payload, done) {
  return getMaxAge().then(function(response) {
    actionContext.dispatch('GET_MAXAGE_SUCCESS', response.text);
    done();
  })
};


function getMaxAge() {
  return request('GET', 'http://www.etachki.com/api/getMaxAge');
}
