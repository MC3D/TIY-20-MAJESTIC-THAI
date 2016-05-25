/* globals Backbone */

(function() {
  'use strict';

  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Collections.OrderItems = Backbone.Collection.extend({
    model: window.app.Models.OrderItem,
    localStorage: new Backbone.LocalStorage('orders-backbone')
  });

})();
