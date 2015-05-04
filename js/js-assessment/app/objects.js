if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
  return {
    alterContext : function(fn, obj) {
      return fn.apply(obj);

    },

    alterObjects : function(constructor, greeting) {
      constructor.prototype.greeting = greeting
    },

    iterate : function(obj) {
      var result = [];

      for (var i in obj) {
        if ( obj.hasOwnProperty(i) ) {
          
          result.push(i +  ': '+ obj[i])
        }
      }
      return result;

    }
  };
});
