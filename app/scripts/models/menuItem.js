/* globals Backbone */

(function() {
  'use strict';

  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Models.MenuItem = Backbone.Model.extend({
    defaults: function() {
      return {
        imgURL: '',
        item: '',
        description: '',
        price: 0,
        isActive: false
      };
    }
  });
})();
