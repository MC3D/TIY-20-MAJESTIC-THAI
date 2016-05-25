/* globals Backbone, _ */

(function() {
  'use strict';

  // form serializer
  $.fn.serializeObject = function() {
    return this.serializeArray().reduce(function(acum, i) {
      acum[i.name] = i.value;
      return acum;
    }, {});
  };

  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Views.Login = Backbone.View.extend({
    template: _.template($('#admin-login-template').html()),
  });
})();
