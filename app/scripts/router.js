/* globals Backbone, alert */

(function(){
  'use strict';

  window.admin = false;

  window.app = window.app || {
    Models: {},
    Collections: {},
    Views: {}
  };

  window.MenuApp = new(Backbone.Router.extend({
    routes: {
      '': 'index',
      'menu/:query': 'renderMenu',
      'admin/orders': 'orderEdit',
      'order': 'renderOrder',
      '*path': 'notFound' // last so that it is the last one to match
    },

    initialize: function() {
      this.indexView = new window.app.Views.Index();
      this.loginView = new window.app.Views.Login();
      this.menuView = new window.app.Views.Menu();
      this.menuItems = new window.app.Collections.MenuItems();
      this.menuItems.fetch();
      this.menuItemsView = new window.app.Views.MenuItems({
        collection: this.menuItems
      });

      this.menuItemAddView = new window.app.Views.MenuItemAdd({
        collection: this.menuItems
      });

      window.temporaryOrder = new window.app.Collections.OrderItems();
      window.temporaryOrder.fetch();

      this.orderView = new window.app.Views.Order();
      this.orderItemsView = new window.app.Views.OrderItems({
        collection: window.temporaryOrder
      });
    },

    start: function() {
      Backbone.history.start({
      });

    },

    index: function() {
        this.indexView.render();
    },

    renderMenu: function(query) {
      this.menuView.render();
      this.menuItemsView.render(query);
    },

    renderOrder: function(){
      this.orderView.render();
      this.orderItemsView.render();
    },

    notFound: function() {
      alert('How do you comfort a JavaScript bug?');
      alert('You console it! :-)');
      Backbone.history.navigate('',{trigger: true});
    }
  }))();

})();
