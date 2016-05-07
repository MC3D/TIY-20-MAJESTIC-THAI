/* globals Backbone */

(function() {
  'use strict';

  // limit pollution of global namespace by creating single global object where everything is stored
  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Collections.TemporaryOrder = Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage('temporary-order-backbone'),
    model: window.app.Models.OrderItem
  });

})();
