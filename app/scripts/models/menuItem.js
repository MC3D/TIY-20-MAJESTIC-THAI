/* globals Backbone */

(function() {
  'use strict';

  // limit pollution of global namespace by creating single global object where everything is stored
  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Models.MenuItem = Backbone.Model.extend({
    // localStorage: new Backbone.LocalStorage('menu-backbone'),
    defaults: function() {
      return {
        imgURL: 'Empty imgURL ...',
        item: 'Empty item ...',
        description: 'Empty description ...',
        price: 'Empty price ...',
        isActive: 'false'
      };
    }
  });
})();
