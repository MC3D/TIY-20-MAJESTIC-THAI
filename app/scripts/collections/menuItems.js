/* globals Backbone */

(function() {
  'use strict';

  // limit pollution of global namespace by creating single global object where everything is stored
  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Collections.MenuItems = Backbone.Firebase.Collection.extend({
    // save all of the menu items under the "menu-backbone" namespace
    // localStorage: new Backbone.LocalStorage('menu-backbone'),
    model: window.app.Models.MenuItem,
    url: 'https://majestic-thai-e7bb0.firebaseio.com/menu'

  });

})();
