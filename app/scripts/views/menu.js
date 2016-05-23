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
      var total = $('#orderTotal').text();
      var items = window.temporaryOrder.toJSON();
      var order = new window.app.Collections.Orders();
      order.create({
        lastName: 'defaultLastName',
        total: total,
        items: items
      });
      window.temporaryOrder.reset();
    }
  });

  window.app.Views.MenuItems = Backbone.View.extend({
    template: _.template($('#menu-items-template').html()),

    initialize: function(options) {
      this.options = options || {};
      this.listenTo(this.collection, 'add', this.renderNew);
      this.listenTo(this.collection, 'reset', this.render);
    },

    render: function(query) {
      this.options.category = query;
      this.options.category = query.toUpperCase();
      $('.menu').empty().append(this.template);

      if(window.admin === true){
        $('.toggle').toggleClass('hidden');
      }

      var filteredMenu = this.collection.where({
        category: this.options.category
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
    },

    renderNew: function(model){
      var category = model.attributes.category;
      if(category === this.options.category){
        this.renderChild(model);
      }
    }

  });

  window.app.Views.MenuItem = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#menu-item-template').html()),

    events: {
      'click .add': 'orderItem',
      'click .remove': 'destroy'
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
      if(window.admin === true){
        this.$('.toggle').toggleClass('hidden');
      }
      return this;
    },

    destroy: function(event) {
      event.preventDefault();
      this.model.destroy();
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
        model.save();
        $('.order-items').find('input').eq(index).val(qty);

      } else {
        qty = this.$('input').val();
        model = new Backbone.Model({
          item: this.model.get('item'),
          price: this.model.get('price'),
          qty: qty
        });
        window.temporaryOrder.create(model);
      }
      this.$('input').val('1');
      return this;
    }
  });

  window.app.Views.MenuItemAdd = Backbone.View.extend({
    el: $('.page'),
    template: _.template($('#menu-item-add-template').html()),

    events: {
      'click .add-new': 'addItem',
      'click .clear': 'clearForm'
    },

    render: function(){
      $('.sidebar').empty().append(this.template());
    },

    addItem: function(event){
      event.preventDefault();
      var newMenuItem = $('.menu-item-add-form').serializeObject();
      this.collection.create(newMenuItem);
      $('.menu-item-add-form').trigger('reset');
    },

    clearForm: function(event){
      event.preventDefault();
      $('.menu-item-add-form').trigger('reset');
    }
  });
})();
