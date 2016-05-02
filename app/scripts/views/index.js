/* globals Backbone, _ */

(function() {
  'use strict';

  // limit pollution of global namespace by creating single global object where everything is stored
  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Views.Index = Backbone.View.extend({
    template: _.template($('#index-template').html()),

    render: function(){
      $('.page').empty().append(this.template());
      this.renderNavigationMenu();
    },

    renderNavigationMenu: function(){
      this.navigationView = new window.app.Views.Navigation();
      this.navigationView.render();
    }
  });
})();
