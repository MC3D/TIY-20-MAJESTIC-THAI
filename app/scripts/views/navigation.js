/* globals Backbone, _ */

(function() {
  'use strict';

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
