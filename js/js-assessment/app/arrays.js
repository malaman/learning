if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
  return {
    indexOf : function(arr, item) {
      return arr.indexOf(item);

    },

    sum : function(arr) {
      var result = 0,
          i,
          size = arr.length;
      for ( i = 0; i < size; i++  ) {
        result += arr[i];

      }
      return result;
    },

    remove : function(arr, item) {
      var i,
          size = arr.length;

      for ( i=0; i < size; i++ ) {
        if ( arr[i] === item ) {
          arr.splice(i, 1);
        }
      }
      return arr;
    },

    removeWithoutCopy : function(arr, item) {
      var result = [],
        i,
        size = arr.length,
        resultSize
      for ( i=0; i < size; i++ ) {
        if ( arr[i] !== item ) {
          result.push(arr[i])
        }
      }
      resultSize = result.length;
      for ( i =0; i < resultSize; i++ ) {
        arr[i] = result[i];
      }

      arr.splice(resultSize);

      return arr;
    },

    append : function(arr, item) {
      arr.push(item);
      return arr;
    },

    truncate : function(arr) {
      arr.pop();
      return arr;
    },

    prepend : function(arr, item) {
      arr.unshift(item);
      return arr;
    },

    curtail : function(arr) {
      arr.splice(0,1);
      return arr;
    },

    concat : function(arr1, arr2) {
      return arr1.concat(arr2);

    },

    insert : function(arr, item, index) {
      arr.splice(index, 0, item);
      return arr;
    },

    count : function(arr, item) {
      var count = 0,
        i,
        size = arr.length;
      for (i = 0; i < size; i++ ) {
        if ( arr[i] === item ) {
          count += 1;
        }
      }
      return count;


    },

    duplicates : function(arr) {
      var sorted_arr = arr.sort(),
        results = [],
        last = arr.length - 1,
        i;
      for ( i = 0; i < last; i++ ) {
        if (sorted_arr[i + 1] == sorted_arr[i] && sorted_arr[i] !== results[results.length - 1]) {
          results.push(sorted_arr[i]);
        }
      }
      return results;

    },

    square : function(arr) {
      var i,
        size = arr.length;

      for ( i = 0; i < size; i++ ) {
        arr[i] = arr[i] * arr[i];
      }
      return arr;
    },

    findAllOccurrences : function(arr, target) {
      var result = [],
        size = arr.length;

      for ( var i = 0; i < size; i++ ) {
        if ( arr[i]  === target) {
          result.push(i);
        }
      }
      return result;
    }
  };
});
