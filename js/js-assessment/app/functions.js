if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
  return {
    argsAsArray : function(fn, arr) {
      var result = '';
      var last = arr.length - 1;


      for (var i=0; i < last; i++ ) {
        result += arr[i];
        if ( i < last - 1) {
          result += ', ';
        }
      }
      result += arr[last];

      return fn(result);
    },

    speak : function(fn, obj) {

    },

    functionFunction : function(str) {

    },

    makeClosures : function(arr, fn) {

    },

    partial : function(fn, str1, str2) {

    },

    useArguments : function() {

    },

    callIt : function(fn) {

    },

    partialUsingArguments : function(fn) {

    },

    curryIt : function(fn) {

    }
  };
});
