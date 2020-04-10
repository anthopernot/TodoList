
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
    document.querySelector('#dialog').hide();
  },
  detailsTaskPage: function(page) {
    // Get the element passed as argument to pushPage.
    var element = page.data.element;

    // Fill the view with the stored data.
    page.querySelector('#inputNameTask').value = element.data.title;
    page.querySelector('#category-input').value = element.data.category;
    page.querySelector('#inputDescrTask').value = element.data.description;
    page.querySelector('#inputUrgentDetailTask').checked = element.data.urgent;

    // Set button functionality to save an existing task.
    page.querySelector('[component="button/save-task"]').onclick = function() {
      var newTitle = page.querySelector('#inputNameTask').value;

      if (newTitle) {
        // If input title is not empty, ask for confirmation before saving.
        ons.notification.confirm(
            {
              title: 'Save changes?',
              message: 'Previous data will be overwritten.',
              buttonLabels: ['Discard', 'Save']
            }
        ).then(function(buttonIndex) {
          if (buttonIndex === 1) {
            // If 'Save' button was pressed, overwrite the task.
            myApp.services.tasks.update(element,
                {
                  title: newTitle,
                  category: page.querySelector('#category-input').value,
                  description: page.querySelector('#inputDescrTask').value,
                  ugent: element.data.urgent,
                }
            );

            // Set selected category to 'All', refresh and pop page.
            document.querySelector('#default-category-list ons-list-item ons-radio').checked = true;
            //document.querySelector('#default-category-list ons-list-item').updateCategoryView();
            document.querySelector('#myNavigator').popPage();
          }
        });

      } else {
        // Show alert if the input title is empty.
        ons.notification.alert('You must provide a task title.');
      }
    };
  },

};

