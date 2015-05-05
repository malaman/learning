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

      var innerFunc = function(str2) {
        return str + ', ' + str2;
      }

      return innerFunc;


    },

    makeClosures : function(arr, fn) {
      var closureCounter = 0

      var closure = function() {
        var result =  fn(arr[closureCounter])
        closureCounter += 1;
        return result;

      }

      var result = [];
      for ( var i in arr ) {
        result.push(closure)
      }

      return result;

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
