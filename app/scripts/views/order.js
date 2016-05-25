/* globals Backbone, _ */

(function() {
  'use strict';

  // limit pollution of global namespace by creating single global object where everything is stored
  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Views.OrderItems = Backbone.View.extend({
    template: _.template($('#order-items-template').html()),

    initialize: function(){
      this.listenTo(this.collection, 'reset', this.reset);
      this.listenTo(this.collection, 'add', this.renderChild);
    },

    render: function() {
      var self = this;
      $('.order-content').empty().append(this.template);
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
        var count = window.temporaryOrder.models.length;
        // console.log(count);
        if(total === 0) {
          $('#order-total').addClass('hidden');
        } else {
          $('#order-total').removeClass('hidden');
        }
        $('#orderTotal').html('$' + total.toFixed(2));
        $('.cart-count').html(count);
    },

    destroy: function(event) {
      event.preventDefault();
      this.model.destroy();
      this.$el.remove();
      this.calculateTotal();
    }
  });
})();
