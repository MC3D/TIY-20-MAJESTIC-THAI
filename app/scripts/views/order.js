/* globals Backbone, _ */

(function() {
  'use strict';

  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Views.Order = Backbone.View.extend({
    el: $('.page'),
    template: _.template($('#order-template').html()),

    render: function(){
      this.$el.empty().append(this.template());
      this.renderNavigationMenu();
    },

    renderNavigationMenu: function(){
      this.navigationView = new window.app.Views.Navigation();
      this.navigationView.render();
    },
  });

  window.app.Views.OrderItems = Backbone.View.extend({
    template: _.template($('#order-items-template').html()),

    initialize: function(){
      this.listenTo(this.collection, 'reset', this.reset);
      this.listenTo(this.collection, 'add', this.renderChild);
    },

    render: function() {
      var self = this;
      $('.order').empty().append(this.template);
      var total = window.temporaryOrder.reduce(function(acum, i){
        return Number(i.attributes.price) * Number(i.attributes.qty) + acum;
      },0);


      if(total !== 0){
        $('#order-total').removeClass('hidden');
      } else {
        $('#order-total').addClass('hidden');
      }
      $('.order-total').html('$' + total.toFixed(2));
      $('.cart').addClass('active');
      var order = window.temporaryOrder.models;
      _.each(order, function(item){
        self.renderChild(item);
      });
      return this;
    },

    renderChild: function(model){
      var orderItemView = new window.app.Views.OrderItem({
        model: model,
      });
      orderItemView.render();
    },

    reset: function(){
      this.render();
    }
  });

  window.app.Views.OrderItem = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#order-item-template').html()),

    events: {
      'click .remove': 'destroy',
      'keyup .order-item-input': 'updateQty',
      'blur .order-item-input': 'updateQty',
      'click .order-item-input': 'updateQty'
    },

    initialize: function(options) {
      options = options || {};
      this.listenTo(this.model, 'change', this.calculateTotal);
    },

    render: function() {
      var attributes = this.model.toJSON();
      var html = this.template(attributes);
      this.$el.append(html);
      $('.order-items').append(this.el);
      this.calculateTotal();
      return this;
    },

    add: function(){
      var attributes = this.model.toJSON();
      var html = this.template(attributes);
      this.$el.append(html);
      this.calculateTotal();
      return this;
    },

    updateQty: function(){
      var qty = event.target.value;
      this.model.set('qty', qty);
    },

    calculateTotal: function(){
      var total = window.temporaryOrder.reduce(function(acum, i){
        return Number(i.attributes.price) * Number(i.attributes.qty) + acum;
      },0);
      $('.order-total').html('$' + total.toFixed(2));
      if(total !== 0){
        $('#order-total').removeClass('hidden');
      } else {
        $('#order-total').addClass('hidden');
      }
    },

    destroy: function(event) {
      event.preventDefault();
      this.model.destroy();
      this.$el.remove();
      this.calculateTotal();
    }
  });
})();
