/* globals Backbone */

(function() {
  'use strict';

  // limit pollution of global namespace by creating single global object where everything is stored
  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Collections.OrderItems = Backbone.Firebase.Collection.extend({
    // save all of the order items under the "orders-backbone" namespace
    // localStorage: new Backbone.LocalStorage('orders-backbone'),
    model: window.app.Models.OrderItem,
    url: 'https://majestic-thai-e7bb0.firebaseio.com/orders'

  });

})();
