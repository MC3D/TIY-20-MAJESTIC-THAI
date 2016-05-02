/* globals Backbone, _ */

(function() {
  'use strict';

  // limit pollution of global namespace by creating single global object where everything is stored
  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Views.Navigation = Backbone.View.extend({
    template: _.template($('#navigation-template').html()),

    render: function(){
      $('.nav').empty().append(this.template());
    }

  });
})();
