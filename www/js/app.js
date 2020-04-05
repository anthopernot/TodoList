// App logic.
window.myApp = {};

window.addEventListener('load', function(e){
    var page = e.target;

    console.log('Projet TodoList - PERNOT Anthony AI2');

    page.querySelector('[component="button/welcome"]').onclick = function(){
      document.querySelector('#myNavigator').resetToPage('splitter.html');
    };

});

document.addEventListener('init', function(event) {
  var page = event.target;
  // Each page calls its own initialization controller.
  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }

  // Fill the lists with initial data when the pages we need are ready.
  // This only happens once at the beginning of the app.
  if (page.id === 'menuPage' || page.id === 'pendingTasksPage') {
    if (document.querySelector('#menuPage')
        && document.querySelector('#pendingTasksPage')
        && !document.querySelector('#pendingTasksPage ons-list-item')
    ) {
      myApp.services.fixtures.forEach(function (data) {
        myApp.services.tasks.create(data);
      });
    }

  }

});


