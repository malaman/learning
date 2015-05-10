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

    },

    captureThreeNumbers : function(str) {

    },

    matchesPattern : function(str) {

    },
    isUSD : function(str) {

    }
  };
});
