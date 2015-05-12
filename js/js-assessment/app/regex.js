if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
  return {
    containsNumber : function(str) {
      return /(\d+)/.test(str);
    },

    containsRepeatingLetter : function(str) {
      return /([a-zA-Z])\1+/.test(str);
    },

    endsWithVowel : function(str) {
      return /[aeiouAEIOU]$/.test(str);
    },

    captureThreeNumbers : function(str) {
      var result =  str.match(/[0-9]{3}/);
      if ( result ) {
        return result[0];
      }
      return false;
    },

    matchesPattern : function(str) {

    },
    isUSD : function(str) {

    }
  };
});
