/* globals Backbone */

(function() {
  'use strict';

  // limit pollution of global namespace by creating single global object where everything is stored
  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Collections.MenuItems = Backbone.Collection.extend({
    // save all of the menu items under the "menu-backbone" namespace
    // localStorage: new Backbone.LocalStorage('backbone-menu'),
    model: window.app.Models.MenuItem,
  });

})();
