/* globals Backbone, _, alert */

(function() {
  'use strict';

  // limit pollution of global namespace by creating single global object where everything is stored
  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Views.Menu = Backbone.View.extend({
    el: $('.page'),
    template: _.template($('#menu-template').html()),

    events: {
      'click .submit-order': 'submitOrder'
    },

    render: function(){
      this.$el.empty().append(this.template());
      this.renderNavigationMenu();
    },

    renderNavigationMenu: function(){
      this.navigationView = new window.app.Views.Navigation();
      this.navigationView.render();
    },

    submitOrder: function(){
      var order = window.temporaryOrder.models;
      _.each(order, function(item){
        item.save();
      });
      window.temporaryOrder.reset();  
    }
  });

  window.app.Views.MenuItems = Backbone.View.extend({
    template: _.template($('#menu-items-template').html()),

    initialize: function() {
      this.listenTo(this.collection, 'add', this.renderChild);
      this.listenTo(this.collection, 'reset', this.render);
    },

    render: function(query) {
      var category = query.toUpperCase();
      $('.menu').empty().append(this.template);
      var filteredMenu = this.collection.where({
        category: category
      });
      filteredMenu.forEach(this.renderChild, this);
      return this;
    },

    renderChild: function(model) {
      var menuItemView = new window.app.Views.MenuItem({
        model: model
      });
      menuItemView.render();
      $('.menu-items').append(menuItemView.el);
      return this;

    }
  });

  window.app.Views.MenuItem = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#menu-item-template').html()),

    events: {
      'click .add': 'orderItem'
    },

    initialize: function(options) {
      options = options || {};
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.empty();
      var attributes = this.model.toJSON();
      var html = this.template(attributes);
      this.$el.append(html);
      return this;
    },

    remove: function(event) {
      event.preventDefault();
      this.$el.remove();
    },

    orderItem: function(event) {
      event.preventDefault();
      if (this.$('input').val() === '0' || this.$('input').val().length === 0) {
        alert('Please Enter Valid Quantity');
        return;
      }

      // check to see if description already exists in the order list
      var item = this.model.get('item');
      var index = window.temporaryOrder.map(function(item){
        return item.get('item');
      }).indexOf(item);
      var qty, model;

      // if item already exists in order list, update quantity, else add item to order list
      if (index !== -1) {
        qty = Number(window.temporaryOrder.models[index].attributes.qty) + Number(this.$('input').val());
        model = window.temporaryOrder.models[index];
        model.set('qty', qty);
        $('.order-items').find('input').eq(index).val(qty);

      } else {
        qty = this.$('input').val();
        model = this.model.clone();
        model.set('qty', qty);
        var orderItemView = new window.app.Views.OrderItem({
          model: model,
        });
        orderItemView.add();
        $('.order-items').append(orderItemView.el);
      }
      this.$('input').val('1');
      return this;
    }
  });
})();
