if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
  return {
    indexOf : function(arr, item) {
      return arr.indexOf(item);

    },

    sum : function(arr) {
      var result = 0;
      for ( var i in arr) {
        result += arr[i];

      }
      return result;
    },

    remove : function(arr, item) {
      for ( var i in arr) {
        if ( arr[i] === item ) {
          arr.splice(i, 1);
        }
      }
      return arr;
    },

    removeWithoutCopy : function(arr, item) {
      var result = [];
      for ( var i in arr) {
        if ( arr[i] !== item ) {
          result.push(arr[i])
        }
      }
      for ( var i  in result ) {
        arr[i] = result[i];
      }
      arr.splice(result.length);

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
      var count = 0;
      for ( var i in arr) {
        if ( arr[i] === item ) {
          count += 1;
        }
      }
      return count;


    },

    duplicates : function(arr) {
      var sorted_arr = arr.sort();

      var results = [];
      for (var i = 0; i < arr.length - 1; i++) {
        if (sorted_arr[i + 1] == sorted_arr[i] && sorted_arr[i] !== results[results.length - 1]) {
          results.push(sorted_arr[i]);
        }
      }
      return results;

    },

    square : function(arr) {
      for ( var i in arr ) {
        arr[i] = arr[i] * arr[i];
      }
      return arr;
    },

    findAllOccurrences : function(arr, target) {
      var result = [];

      for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i]  === target) {
          result.push(i);
        }
      }
      return result;
    }
  };
});
