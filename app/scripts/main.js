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
