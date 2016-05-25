/* globals Backbone */

(function() {
  'use strict';

  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Collections.Orders = Backbone.Firebase.Collection.extend({
    url: 'https://majestic-thai-e7bb0.firebaseio.com/orders'
  });

})();
