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

    // render: function(){
    //   this.renderNavigationMenu();
    // },
    //
    // renderNavigationMenu: function(){
    //   this.navigationView = new window.app.Views.Navigation();
    //   this.navigationView.render();
    // }
  });

  // window.app.Views.MenuEdit = Backbone.View.extend({
  //   el: '.page',
  //   template: _.template($('#menu-edit-template').html()),
  //
  //   render: function(){
  //     this.$el.empty().append(this.template());
  //     this.renderNavigationMenu();
  //   },
  //
  //   renderNavigationMenu: function(){
  //     this.navigationView = new window.app.Views.Navigation();
  //     this.navigationView.render();
  //   }
  // });
  //
  // window.app.Views.MenuItemsEdit = Backbone.View.extend({
  //   template: _.template($('#menu-items-edit-template').html()),
  //
  //   initialize: function() {
  //     this.listenTo(this.collection, 'add', this.renderChild);
  //     this.listenTo(this.collection, 'reset', this.render);
  //   },
  //
  //   render: function(query) {
  //     var category = query.toUpperCase();
  //     $('.menu').empty().append(this.template);
  //     var filteredMenu = this.collection.where({
  //       category: category
  //     });
  //     filteredMenu.forEach(this.renderChild, this);
  //     return this;
  //   },
  //
  //   renderChild: function(model) {
  //     var menuItemView = new window.app.Views.MenuItem({
  //       model: model
  //     });
  //     menuItemView.render();
  //     $('.menu-items').append(menuItemView.el);
  //     return this;
  //
  //   }
  // });

  // window.app.Views.MenuItemAdd = Backbone.View.extend({
  //   el: '.page',
  //   template: _.template($('#menu-item-add-template').html()),
  //
  //   events: {
  //     'click .add-new': 'addItem',
  //     'click .clear': 'clearForm'
  //   },
  //
  //   render: function(){
  //     this.$el.empty().append(this.template());
  //     this.renderNavigationMenu();
  //   },
  //
  //   renderNavigationMenu: function(){
  //     this.navigationView = new window.app.Views.Navigation();
  //     this.navigationView.render();
  //   },
  //
  //   addItem: function(event){
  //     event.preventDefault();
  //     var item = $('.menu-item-add-form').serializeObject();
  //     console.log(item);
  //   },
  //
  //   clearForm: function(event){
  //     event.preventDefault();
  //     $('.menu-item-add-form').trigger('reset');
  //   }
  // });
})();
