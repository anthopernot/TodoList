
window.myApp = {};

window.addEventListener('load', function(e){
    var page = e.target;
    console.log('Projet TodoList - PERNOT Anthony AI2');
    page.querySelector('[component="button/welcome"]').onclick = function(){
      document.querySelector('#myNavigator').resetToPage('splitter.html');
    };
    localStorage.setItem('tasks', JSON.stringify(myApp.services.fixtures));
    localStorage.setItem('categories', JSON.stringify(myApp.services.categoriesTab));
});

document.addEventListener('init', function(event) {
  var page = event.target;

  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }

    if (page.id === 'menuPage' || page.id === 'pendingTasksPage' || page.id === 'progressTasksPage' || page.id === 'completedTasksPage') {

        if (document.querySelector('#menuPage')
            && document.querySelector('#pendingTasksPage')
            && !document.querySelector('#pendingTasksPage ons-list-item')
        ) {
            myApp.services.fixtures.forEach(function (data) {
                if(data['statut'] === '0')  {
                    myApp.services.tasks.create(data);
                }
            });

        } else if (document.querySelector('#menuPage')
            && document.querySelector('#progressTasksPage')
            && !document.querySelector('#progressTasksPage ons-list-item')
        ){
            myApp.services.fixtures.forEach(function (data) {
                if(data['statut'] === '1')  {
                    myApp.services.tasks.create(data);
                }
            });
        } else if (document.querySelector('#menuPage')
            && document.querySelector('#completedTasksPage')
            && !document.querySelector('#completedTasksPage ons-list-item')
        ){
            myApp.services.fixtures.forEach(function (data) {
                if(data['statut'] === '2')  {
                    myApp.services.tasks.create(data);
                }
            });
        }
    }

    if(page.id === 'menuPage'){
        if(document.querySelector('#menuPage')){
            myApp.services.categoriesTab.forEach(function (data) {
                myApp.services.categories.addToMenuPage(data);
            });
        }
        document.querySelector('#allCategory').addEventListener('click', function (e) {
            myApp.services.categoriesTab.forEach(function (data) {
                myApp.services.categories.addToMenuPage(data);
            });
        });
    }

    if(page.id === 'newTaskPage'){
        if(document.querySelector('#newTaskPage')){
            myApp.services.categoriesTab.forEach(function (data) {
                var cateJSON = {
                    id:data.id,
                    name:data.name
                };
                myApp.services.categories.create(cateJSON);
            });
        }
        document.querySelector('#btnSaveTask').addEventListener('click',function () {
        });

         document.querySelector('#addCategory').addEventListener('click', function () {
          var input = document.querySelector('.newCateInput');
          var categoryTaskList = document.querySelector('#listCategoryMenu');
             var cateJSON = {
                 id: myApp.services.categoriesTab.length,
                 name: input.value
             };

          if(input.value !== ""){
              myApp.storage.createCategory(cateJSON);
              if(categoryTaskList.childElementCount !== 0) {
                  myApp.services.categories.addToMenuPage(cateJSON);
              }
              input.value = "";

          }else{
              console.error('Veuillez renseignez un nom à la catégorie');
          }
        });

    }

});


