
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

    if (page.id === 'menuPage' || page.id === 'pendingTasksPage' || page.id === 'progressTasksPage' || page.id === 'completedTasksPage') {

        if (document.querySelector('#menuPage')
            && document.querySelector('#pendingTasksPage')
            && !document.querySelector('#pendingTasksPage ons-list-item')
        ) {
            myApp.services.fixtures.forEach(function (data) {
                if(data['statut'] === '0' && data['date'] > Date())  {
                    myApp.services.tasks.create(data);
                }
            });

        } else if (document.querySelector('#menuPage')
            && document.querySelector('#progressTasksPage')
            && !document.querySelector('#progressTasksPage ons-list-item')
        ){
            myApp.services.fixtures.forEach(function (data) {
                if(data['statut'] === '1' && data['date'] > Date() )  {
                    myApp.services.tasks.create(data);
                }
            });
        } else if (document.querySelector('#menuPage')
            && document.querySelector('#completedTasksPage')
            && !document.querySelector('#completedTasksPage ons-list-item')
        ){
            myApp.services.fixtures.forEach(function (data) {
                if(data['statut'] === '2' && data['date'] > Date() )  {
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
            document.querySelector('#allTaskTabbarPage').onclick = function (data) {
                if(myApp.services.categoriesTab.length !== 0){
                    myApp.services.tasks.removeTaskToHomePageForCate();
                    myApp.services.fixtures.forEach(function (data) {
                        myApp.services.tasks.create(data);
                    });
                }
            };
            document.querySelector('#allCategory').addEventListener('click', function (e) {
                myApp.services.categoriesTab.forEach(function (data) {
                    if(myApp.services.categoriesTab.length !== 0){
                        myApp.services.categories.addToMenuPage(data);
                    }
                });
            });
            for (let i=0;i<myApp.services.categoriesTab.length;i++){
                document.querySelector("#categoryMenuElem"+i).onclick = function () {
                    //console.log(myApp.services.categoriesTab[i]);
                    if(myApp.services.categoriesTab.length !== 0) {
                        myApp.services.tasks.removeTaskToHomePageForCate();
                        myApp.services.fixtures.forEach(function (data) {
                            if (myApp.services.categoriesTab[i].name === data.category) {
                                myApp.services.tasks.create(data);
                            }
                        });
                    }
                }
            }
        }
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
            var name = document.querySelector('#inputNameTask').value;
            var description = document.querySelector('#inputDescrTask').value;
            var date = document.querySelector('#inputDateTask').value;
            var urgent = document.querySelector('#inputUrgentNewTask').checked;
            var radios = document.getElementsByName('categoryNewTask');
            var category;
            for(var i = 0; i < radios.length; i++){
                if(radios[i].checked){
                    category = radios[i].value;
                }
            }
            if(date < Date()){
                date = Date()
            }

            if((name !== "" && description !== "" && date !=="" ) ){
                var taskJSON = {
                    id:myApp.services.fixtures.length,
                    title: name,
                    category: category,
                    description: description,
                    date: date,
                    statut: '0',
                    urgent: urgent
                };

                myApp.storage.createTask(taskJSON);
                myApp.services.tasks.create(taskJSON);
                document.querySelector('#myNavigator').popPage();
                console.log(JSON.stringify(taskJSON));
            }else{
                ons.notification.alert('Veuillez remplir les champs demandés pour pouvoir créer votre tâche ! ');
                console.error('Veuillez remplir les champs demandés pour pouvoir créer votre tâche ! ');
            }
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


