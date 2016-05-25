/* globals Backbone */

(function() {
  'use strict';

  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Models.OrderItem = Backbone.Model.extend({
    defaults: {
      item: '',
      qty: 0,
      price: 0
    }
  });
})();
