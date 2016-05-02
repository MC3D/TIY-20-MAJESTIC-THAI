window.data = [{
  category: 'APPETIZERS',
  items: [{
    imgURL: 'Empty imgURL ...',
    item: 'CHICKEN SATAY (4 pcs)',
    description: 'Chicken marinated in Thai spices, skewered and grilled to perfection, served with peanut sauce and small cucumber salad.',
    price: '6.95',
    isActive: true
  }, {
    imgURL: 'Empty imgURL ...',
    item: 'CRAB WONTONS (6 pcs)',
    description: 'Crispy wonton skin stuffed with crab, cream cheese and avocado. Served with sweet and sour sauce.',
    price: '6.50',
    isActive: true
  }, {
    imgURL: 'Empty imgURL ...',
    item: 'CURRY POPPERS (6 pcs)',
    description: 'Fried Thai dumpling stuffed with ground chicken, potato, onion and yellow curry powder with sweet and sour sauce.',
    price: '6.95',
    isActive: false
  }, {
    imgURL: 'Empty imgURL ...',
    item: 'KA NOOM JEEB (4 pcs)',
    description: 'Steam seasoned ground shrimp and chicken wrapped in Thai dumpling skin. Served with house special sauce.',
    price: '6.95',
    isActive: false
  }]
}, {
  category: 'ENTREES',
  items: [{
    imgURL: 'Empty imgURL ...',
    item: 'PAD KEE MOW',
    description: 'Flat rice noodles stir fried with fresh garlic, onions, bell peppers and basil.',
    price: '9.50',
    isActive: true
  }, {
    imgURL: 'Empty imgURL ...',
    item: 'BASIL EGGPLANT',
    description: 'Eggplant stir fried in spicy basil sauce with onions, bell peppers, string beans and bamboo shoots.',
    price: '9.50',
    isActive: true
  }, {
    imgURL: 'Empty imgURL ...',
    item: 'GINGER FISH',
    description: 'Grilled or fried 8 oz. tilapia filet with steamed vegetables, topped with ginger sauce.',
    price: '16.95',
    isActive: false
  }]
}, {
  category: 'DESSERTS',
  items: [{
    imgURL: 'Empty imgURL ...',
    item: 'Thai Coconut Custard with Sticky Rice',
    description: 'Empty description ...',
    price: '4.95',
    isActive: true
  }, {
    imgURL: 'Empty imgURL ...',
    item: 'Mango and Sticky Rice (with coconut)',
    description: 'Empty description ...',
    price: '4.95',
    isActive: true
  }, {
    imgURL: 'Empty imgURL ...',
    item: 'Fried Ice Cream',
    description: 'Empty description ...',
    price: '4.95',
    isActive: false
  }, {
    imgURL: 'Empty imgURL ...',
    item: 'Green Tea Ice Cream',
    description: 'Empty description ...',
    price: '4.95',
    isActive: false
  }]
}];

window.menu = [];

// push each item in 'items' array into a new data array
window.createMenu = function(object){
  'use strict';
  object.items.forEach(function(item){
    window.menu.push(item);
  });
};

// remove category property from each object
window.removeData = function(object){
  'use strict';
  delete object.category;
  window.createMenu(object);
  return object;
};

// add category property to each object in 'items' array
window.data.forEach(function(object){
  'use strict';
  object.items.forEach(function(item){
    item.category = object.category;
    return item;
  });
  window.removeData(object);
  return object;
});

// console.log(window.menu);
