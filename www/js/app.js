
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
  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }

  if (page.id === 'menuPage' || page.id === 'pendingTasksPage') {
    if (document.querySelector('#menuPage')
        && document.querySelector('#pendingTasksPage')
        && !document.querySelector('#pendingTasksPage ons-list-item')
    ) {
      myApp.services.fixtures.forEach(function (data) {
        if(data.statut === '0')  {
            myApp.services.tasks.create(data);
        }
      });
    }
  }

  if (page.id === 'menuPage' || page.id === 'progressTasksPage') {
      if (document.querySelector('#menuPage')
            && document.querySelector('#progressTasksPage')
            && !document.querySelector('#progressTasksPage ons-list-item')
        ) {
            myApp.services.fixtures.forEach(function (data) {
                if(data.statut === '1')  {
                    myApp.services.tasks.create(data);
                }
            });
      }
  }

  if (page.id === 'menuPage' || page.id === 'completedTasksPage') {
        if (document.querySelector('#menuPage')
            && document.querySelector('#completedTasksPage')
            && !document.querySelector('#completedTasksPage ons-list-item')
        ) {
            myApp.services.fixtures.forEach(function (data) {
                if(data.statut === '2')  {
                    myApp.services.tasks.create(data);
                }
            });
        }
    }


  if(page.id === 'newTaskPage'){
      if(document.querySelector('#newTaskPage')){
          myApp.services.categoriesTab.forEach(function (data) {
            myApp.services.categories.create(data);
          });
      }
      document.querySelector('#btnSaveTask').addEventListener('click',function () {
            myApp.storage.storageAvailable('localStorage');
      });
      /**
      document.querySelector('#addCategory').addEventListener('click', function () {
          var value = document.querySelector('.newTaskInput');

          if(value !== ""){
              myApp.services.categories.create(value);
          }else{
              console.error('Veuillez renseignez un nom à la catégorie');
          }
      });*/
  }

});


