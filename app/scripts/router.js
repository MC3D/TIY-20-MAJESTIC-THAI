/* globals Backbone, alert */

(function(){
  'use strict';

  var menu = window.menu;

  window.app = window.app || {
    Models: {},
    Collections: {},
    Views: {}
  };

  window.MenuApp = new(Backbone.Router.extend({
    routes: {
      '': 'index',
      'menu/:query': 'renderMenu',
      'admin/menu': 'menuAdd',
      'admin/orders': 'orderEdit',
      '*path': 'notFound' // last so that it is the last one to match
    },

    initialize: function() {
      this.indexView = new window.app.Views.Index();
      this.menuView = new window.app.Views.Menu();
      this.loginView = new window.app.Views.Login();
      this.addMenuItemView = new window.app.Views.AddMenuItem();
      this.menuItems = new window.app.Collections.MenuItems(menu);
      this.menuItemsView = new window.app.Views.MenuItems({
        collection: this.menuItems
      });
      window.temporaryOrder = new window.app.Collections.OrderItems();
      this.orderItemsView = new window.app.Views.OrderItems({collection: window.temporaryOrder});
    },

    start: function() {
      Backbone.history.start({
        // pushState: true (getting error w/o #)
      });

    },

    index: function() {
        this.indexView.render();
    },

    renderMenu: function(query) {
      this.menuView.render();
      this.menuItemsView.render(query);
      this.orderItemsView.render();
    },

    menuAdd: function(){
      this.addMenuItemView.render();
    },

    notFound: function() {
      alert('route not found');
      Backbone.history.navigate('',{trigger: true});
    }

  }))();

})();
