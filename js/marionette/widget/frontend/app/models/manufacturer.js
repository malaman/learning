define(function (require) {
  'use strict';
  var Backbone = require('backbone');
  //var $ = require('jquery');

  var Manufacturer = Backbone.Model.extend({
    defaults: {
      id: null,
      ru_name: ''
    }
  });

  var ManufacturerCollection = Backbone.Collection.extend({
    url: 'http://etachki.com/api/getAllActiveManufacturers',
    model: Manufacturer

  });



  return ManufacturerCollection;
});