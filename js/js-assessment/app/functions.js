if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
  return {
    argsAsArray : function(fn, arr) {
      var greeting = arr[0];
      var name = arr[1];
      var punctuation = arr[2];

      return fn(greeting, name, punctuation);
    },

    speak : function(fn, obj) {
      return fn.call(obj);

    },

    functionFunction : function(str) {
      return function(str2) {
        return str + ', ' + str2;
      };


    },

    makeClosures : function(arr, fn) {
      var closureCounter = 0,
        closure = function() {
          var result =  fn(arr[closureCounter]);

          closureCounter += 1;
          return result;

        },
        result = [],
        i,
        size = arr.length;
      for ( i = 0; i < size; i++ ) {
        result.push(closure)
      }

      return result;

    },

    partial : function(fn, str1, str2) {
      return function (str3) {
        return fn.call(this, str1, str2, str3);
      };

    },

    useArguments : function() {
      var result = 0;
      for ( var i in arguments ) {
        if ( arguments.hasOwnProperty(i) ) {
          result += arguments[i];
        }

      }
      return result;
    },

    callIt : function(fn) {
      var argsArray = Array.prototype.slice.call(arguments);
      argsArray.shift();
      return fn.apply(null, argsArray);
    },

    partialUsingArguments : function(fn) {

    },

    curryIt : function(fn) {

    }
  };
});