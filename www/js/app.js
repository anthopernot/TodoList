
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

  window.localStorage.setItem('fixtures', myApp.services.fixtures);
  window.localStorage.setItem('categoriesTab', myApp.services.categoriesTab);

  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }


    if (page.id === 'menuPage' || page.id === 'pendingTasksPage' || page.id === 'progressTasksPage' || page.id === 'completedTasksPage') {

        if (document.querySelector('#menuPage')
            && document.querySelector('#pendingTasksPage')
            && !document.querySelector('#pendingTasksPage ons-list-item')
        ) {
            //////////////// A REFAIRE //////////////////
            myApp.services.fixtures.forEach(function (data) {
                if(data.statut === '0')  {
                    myApp.services.tasks.create(data);
                }
            });
        } else if (document.querySelector('#menuPage')
            && document.querySelector('#progressTasksPage')
            && !document.querySelector('#progressTasksPage ons-list-item')
        ){
            //////////////// A REFAIRE //////////////////
            myApp.services.fixtures.forEach(function (data) {
                if(data.statut === '1')  {
                    myApp.services.tasks.create(data);
                }
            });
        } else if (document.querySelector('#menuPage')
            && document.querySelector('#completedTasksPage')
            && !document.querySelector('#completedTasksPage ons-list-item')
        ){
            //////////////// A REFAIRE //////////////////
            myApp.services.fixtures.forEach(function (data) {
                if(data.statut === '2')  {
                    myApp.services.tasks.create(data);
                }
            });
        }
    }

    if(page.id === 'menuPage'){
        if(document.querySelector('#menuPage')){
                myApp.services.categories.addToMenuPage();
        }
        document.querySelector('#allCategory').addEventListener('click', function (e) {
                myApp.services.categories.addToMenuPage();
        });
    }

    if(page.id === 'newTaskPage'){
        if(document.querySelector('#newTaskPage')){
            //////////////// A REFAIRE //////////////////
            myApp.services.categoriesTab.forEach(function (data) {
                myApp.services.categories.create(data);
            });
        }
        document.querySelector('#btnSaveTask').addEventListener('click',function () {

        });

        /** //////////////// A REFAIRE //////////////////
         document.querySelector('#addCategory').addEventListener('click', function () {
          var input = document.querySelector('.newTaskInput');

          if(input.textContent !== ""){
              myApp.storage.createCategoryForInput(input.value);

          }else{
              console.log('Veuillez renseignez un nom à la catégorie');
          }
        });
         */
    }

});


