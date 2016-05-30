/* globals Backbone */

(function() {
  'use strict';

  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Models.MenuItem = Backbone.Model.extend({
    defaults: function() {
      return {
        imgURL: '',
        item: '',
        description: '',
        price: 0,
        isActive: false
      };
    }
  });
})();

/* globals Backbone */

(function() {
  'use strict';

  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Models.OrderItem = Backbone.Model.extend({
    defaults: {
      item: '',
      qty: 0,
      price: 0
    }
  });
})();

/* globals Backbone */

(function() {
  'use strict';

  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Collections.MenuItems = Backbone.Firebase.Collection.extend({
    model: window.app.Models.MenuItem,
    url: 'https://majestic-thai-e7bb0.firebaseio.com/menu'
  });

})();

/* globals Backbone */

(function() {
  'use strict';

  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Collections.OrderItems = Backbone.Collection.extend({
    model: window.app.Models.OrderItem,
    localStorage: new Backbone.LocalStorage('orders-backbone')
  });

})();

/* globals Backbone */

(function() {
  'use strict';

  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Collections.Orders = Backbone.Firebase.Collection.extend({
    url: 'https://majestic-thai-e7bb0.firebaseio.com/orders'
  });

})();

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

/* globals Backbone, _ */

(function() {
  'use strict';

  // limit pollution of global namespace by creating single global object where everything is stored
  window.app = window.app || {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.app.Views.Index = Backbone.View.extend({
    template: _.template($('#index-template').html()),

    render: function(){
      $('.page').empty().append(this.template());
      this.renderNavigationMenu();
    },

    renderNavigationMenu: function(){
      this.navigationView = new window.app.Views.Navigation();
      this.navigationView.render();
    }
  });
})();

/* globals Backbone, _, alert */

(function() {
  'use strict';

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
      var total = $('.order-total').text();
      var items = window.temporaryOrder.toJSON();
      var order = new window.app.Collections.Orders();
      order.create({
        lastName: 'defaultLastName',
        total: total,
        items: items
      });
      localStorage.removeItem('orders-backbone');
      window.temporaryOrder.reset();
      $('.order-items').empty();
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
      $('.' + query).addClass('active');

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
      } else {
        var total = window.temporaryOrder.reduce(function(acum, i){
          return Number(i.attributes.price) * Number(i.attributes.qty) + acum;
        },0);
        $('.order-total').html('$' + total.toFixed(2));
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
        // $('.order-items').find('input').eq(index).val(qty);

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

      var total = window.temporaryOrder.reduce(function(acum, i){
        return Number(i.attributes.price) * Number(i.attributes.qty) + acum;
      },0);
      // $('#orderTotal').html('$' + total.toFixed(2));
      $('.order-total').html('$' + total.toFixed(2));

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

  $(document).ready(function() {
    window.MenuApp.start();
  });

})();

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
      alert('route not found');
      Backbone.history.navigate('',{trigger: true});
    }
  }))();

})();
