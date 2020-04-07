
myApp.controllers = {
  tabbarPage: function(page) {
    page.querySelector('[component="button/menu"]').onclick = function() {
      document.querySelector('#mySplitter').left.toggle();
    };

    Array.prototype.forEach.call(page.querySelectorAll('[component="button/new-task"]'), function(element) {
      element.onclick = function() {
        document.querySelector('#myNavigator').pushPage('html/new_task.html');
      };

      element.show && element.show(); // Fix ons-fab in Safari.
    });
  },
  createAlertDialog: function() {
    var dialog = document.querySelector('#dialog');
    if (!dialog) {
      ons.createElement('alert-dialog.html', { append: true }).then(function(dialog) {
        dialog.show();
      });
    } else {
      dialog.show();
    }
  },
  hideAlertDialog: function () {
    document.getElementById('dialog').hide();
  },
  addCategory: function () {
    var value = document.querySelector('.newTaskInput').textContent;

      if(value !== ""){
         myApp.services.categories.create(value);
      }else{
        console.error('Veuillez renseignez un nom à la catégorie');
      }

  }

};

