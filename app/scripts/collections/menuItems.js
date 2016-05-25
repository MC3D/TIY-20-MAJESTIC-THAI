/* globals Backbone */

(function() {
  'use strict';

  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Collections.MenuItems = Backbone.Firebase.Collection.extend({
    model: window.app.Models.MenuItem,
    url: 'https://majestic-thai-e7bb0.firebaseio.com/menu'
  });

})();
