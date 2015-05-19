if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
  return {
    listFiles: function(data, dirName) {

    },

    permute: function(arr) {

    },

    fibonacci: function(n) {
      var prev,
          current,
          result,
          i;

      if ( n == 0 ) {
          return 0;
      }
      if ( n == 1 || n == -1 ) {
          return 1;
      }
      prev = 0;
      current = 1;
      if ( n > 0 ) {
          for (i = 2; i <= n; i++ ) {
              result = prev + current;
              prev = current;
              current = result;
          }
      } else {
          for (i = -2; i >= n; i-- ) {
              result = prev - current;
              prev = current;
              current = result;
          }
      }
      return result;


    },

    validParentheses: function(n) {

    }
  };
});
