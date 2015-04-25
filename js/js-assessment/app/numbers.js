if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
  return {
    valueAtBit: function(num, bit) {
      var binNum = num.toString(2).split('').reverse().join('');
      return parseInt(binNum[bit-1]);

    },

    base10: function(str) {
      return parseInt(str, 2);

    },

    convertToBinary: function(num) {
      var result = num.toString(2);
      if (result.length < 8) {
        while ( result.length < 8 ) {
          result = '0' + result;
        }
      }
      return result;

    },

    multiply: function(a, b) {
      return  parseFloat((a*b).toFixed(4));
    }
  };
});

