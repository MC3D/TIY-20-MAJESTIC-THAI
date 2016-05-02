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

  // limit pollution of global namespace by creating single global object where everything is stored
  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Views.Login = Backbone.View.extend({
    template: _.template($('#admin-login-template').html()),

    render: function(){
      this.renderNavigationMenu();
    },

    renderNavigationMenu: function(){
      this.navigationView = new window.app.Views.Navigation();
      this.navigationView.render();
    }
  });

  window.app.Views.AddMenuItem = Backbone.View.extend({
    el: '.page',
    template: _.template($('#menu-item-add-template').html()),

    events: {
      'click .add-new': 'addItem',
      'click .clear': 'clearForm'
    },

    render: function(){
      $('.page').empty().append(this.template());
      this.renderNavigationMenu();
    },

    renderNavigationMenu: function(){
      this.navigationView = new window.app.Views.Navigation();
      this.navigationView.render();
    },

    addItem: function(event){
      event.preventDefault();
      var item = $('.menu-item-add-form').serializeObject();
      console.log(item);
    },

    clearForm: function(event){
      event.preventDefault();
      $('.menu-item-add-form').trigger('reset');
    }
  });
})();
