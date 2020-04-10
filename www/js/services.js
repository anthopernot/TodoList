
myApp.services = {
  tasks: {

    create: function (data) {

      var taskItem = ons.createElement(
        '<ons-list-item id="taskElem'+data['id'] +'" tappable category="' + data['description'] + '">' +
        '<label class="left">' +
        '<ons-checkbox></ons-checkbox>' +
        '</label>' +
        '<div class="center">' +
          data['title'] +
        '</div>' +
        '<div class="right">' +
        '<ons-icon style="color: grey; padding-left: 4px" icon="ion-ios-trash-outline, material:md-delete"></ons-icon>' +
        '</div>' +
        '</ons-list-item>'
      );

      taskItem.data = data;


        if(taskItem.data['statut'] === '0' ){
          var pendingList = document.querySelector('#pending-list');
          pendingList.insertBefore(taskItem, taskItem.data['urgent'] ? pendingList.firstChild : null);
        }else if (taskItem.data['statut'] === '1' ){
          var progressList = document.querySelector('#progress-list');
          progressList.insertBefore(taskItem, taskItem.data['urgent'] ? progressList.firstChild : null);
        }else if (taskItem.data['statut'] === '2' ){
          var completedList = document.querySelector('#completed-list');
          completedList.insertBefore(taskItem, taskItem.data['urgent'] ? completedList.firstChild : null);
        }


      /**
       * CHANGEMENT D'ETAT D'UNE TACHE
       */
      taskItem.querySelector('.left').onclick = function(event) {
        myApp.services.animators.swipe(taskItem, function() {
          var pendingList = document.querySelector('#pending-list');
          var progressList = document.querySelector('#progress-list');
          var completedList = document.querySelector('#completed-list');

          for(let elem of document.querySelectorAll('ons-checkbox')){
            elem.checked = false;
          }

          if(taskItem.data['statut'] === '0'){

            myApp.services.fixtures[taskItem.data['id']].statut = '1';
            localStorage.setItem('tasks', JSON.stringify(myApp.services.fixtures));
            pendingList.removeChild(document.querySelector("#taskElem"+taskItem.data.id+""));
            progressList.appendChild(taskItem);

          }else if(taskItem.data['statut'] === '1'){

            myApp.services.fixtures[taskItem.data['id']].statut = '2';
            localStorage.setItem('tasks', JSON.stringify(myApp.services.fixtures));
            progressList.removeChild(document.querySelector("#taskElem"+taskItem.data.id+""));
            completedList.appendChild(taskItem);

          }else if(taskItem.data['statut'] === '2'){

            localStorage.setItem('tasks', JSON.stringify(myApp.services.fixtures));
            completedList.removeChild(document.querySelector("#taskElem"+taskItem.data.id+""));
            myApp.services.fixtures.splice(taskItem.data.id, 1);
            localStorage.setItem('tasks', JSON.stringify(myApp.services.fixtures));

          }
          console.log(myApp.services.fixtures.length);
          console.log(JSON.stringify(localStorage.getItem('tasks')));
        });

      };

      /**
       * SUPPRESSION D'UNE TACHE
       */
      taskItem.querySelector('.right').onclick = function() {
        myApp.services.animators.remove(taskItem, function() {
          console.log(JSON.stringify(taskItem.data.id));
          if (taskItem.data['statut'] === '0') {
            var pendingList = document.querySelector('#pending-list');
            pendingList.removeChild(document.getElementById(taskItem.id));
            myApp.services.fixtures.splice(taskItem.data.id, 1);
            localStorage.setItem('tasks', JSON.stringify(myApp.services.fixtures));
          } else if (taskItem.data['statut'] === '1') {
            var progressList = document.querySelector('#progress-list');
            progressList.removeChild(document.querySelector("#"+taskItem.id+""));
            myApp.services.fixtures.splice(taskItem.data.id, 1);
            localStorage.setItem('tasks', JSON.stringify(myApp.services.fixtures));
          } else if (taskItem.data['statut'] === '2') {
            var completedList = document.querySelector('#completed-list');
            completedList.removeChild(document.getElementById(taskItem.id));
            myApp.services.fixtures.splice(taskItem.data.id, 1);
            localStorage.setItem('tasks', JSON.stringify(myApp.services.fixtures));
          }
        });
      };

    },
    removeTaskToHomePage : function () {

      var pendingTaskList = document.querySelector('#pending-list');
      var progressTaskList = document.querySelector('#progress-list');
      var completedTaskList = document.querySelector('#completed-list');
      myApp.storage.deleteAllTasks();

        for(let i=0;i<myApp.services.fixtures.length;i++){
          if(completedTaskList.querySelector("#taskElem"+i)){
            completedTaskList.removeChild(document.querySelector("#taskElem"+i));
          }else if(pendingTaskList.querySelector("#taskElem"+i)){
            pendingTaskList.removeChild(document.querySelector("#taskElem"+i));
          }else if(progressTaskList.querySelector("#taskElem"+i)){
            progressTaskList.removeChild(document.querySelector("#taskElem"+i));
          }
        }

    },
    removeTaskToHomePageForCate : function () {
      for(let i=0;i<myApp.services.fixtures.length;i++){
        if(document.querySelector('#completed-list').querySelector("#taskElem"+i)){
          document.querySelector('#completed-list').removeChild(document.querySelector("#taskElem"+i));
        }else if(document.querySelector('#pending-list').querySelector("#taskElem"+i)){
          document.querySelector('#pending-list').removeChild(document.querySelector("#taskElem"+i));
        }else if(document.querySelector('#progress-list').querySelector("#taskElem"+i)){
          document.querySelector('#progress-list').removeChild(document.querySelector("#taskElem"+i));
        }
      }

    }
  },
  categories:{
    create: function (data) {

      var categoryItem = ons.createElement(
          '<ons-list-item id="categoryNewElem'+data['id']+'" tappable>' +
          '<label class="left">' +
          '<ons-radio name="categoryNewTask" value="'+data['name']+'" input-id="radioNew-'+data['id']+'"></ons-radio>' +
          '</label>' +
          '<label for="radioNew-'+data['id']+'" class="center">' +
           data['name'] +
          '</label>' +
          '</ons-list-item>'
      );

      categoryItem.data = data;

      var categoryTaskList = document.querySelector('.listCategoryNewTask');
      if(categoryTaskList.childElementCount !== myApp.services.categoriesTab.length+1){
        categoryTaskList.appendChild(categoryItem);
      }
    },
    addToMenuPage: function (data) {

        var categoryItem = ons.createElement(
            '<ons-list-item id="categoryMenuElem'+data['id']+'" tappable>' +
            '<label class="left">' +
            '<ons-radio name="categoryMenu" value="'+data['name']+'" input-id="radioMenu-'+data['id']+'"></ons-radio>' +
            '</label>' +
            '<label for="radioMenu-'+data['id']+'" class="center">' +
            data['name'] +
            '</label>' +
            '<div class="right">' +
            '<ons-icon style="color: grey; padding-left: 4px" icon="ion-ios-trash-outline, material:md-delete"></ons-icon>' +
            '</div>' +
            '</ons-list-item>'
        );

        categoryItem.data = data;

        var categoryTaskList = document.querySelector('#listCategoryMenu');
        if(categoryTaskList.childElementCount !== myApp.services.categoriesTab.length){
          categoryTaskList.appendChild(categoryItem);
        }


      /**
       * SUPPRESSION D'UNE CATEGORIE
        */
        categoryItem.querySelector('.right').onclick = function() {

            console.log(JSON.stringify(categoryItem.data.id));
            var pendingTaskList = document.querySelector('#pending-list');
            var progressTaskList = document.querySelector('#progress-list');
            var completedTaskList = document.querySelector('#completed-list');
            for(let i=0;i<myApp.services.fixtures.length;i++){
              if(myApp.services.fixtures[categoryItem.data.id].category === categoryItem.data.name){
                if(completedTaskList.querySelector("#taskElem"+categoryItem.data.id)){
                  completedTaskList.removeChild(document.querySelector("#taskElem"+categoryItem.data.id));
                  myApp.services.fixtures.splice(myApp.services.fixtures[categoryItem.data.id], 1);
                  console.log('Suppression réussi');
                }else if(pendingTaskList.querySelector("#taskElem"+categoryItem.data.id)){
                  pendingTaskList.removeChild(document.querySelector("#taskElem"+categoryItem.data.id));
                  myApp.services.fixtures.splice(myApp.services.fixtures[categoryItem.data.id], 1);
                  console.log('Suppression réussi');
                }else if(progressTaskList.querySelector("#taskElem"+categoryItem.data.id)){
                  progressTaskList.removeChild(document.querySelector("#taskElem"+categoryItem.data.id));
                  myApp.services.fixtures.splice(myApp.services.fixtures[categoryItem.data.id], 1);
                  console.log('Suppression réussi');
                }
              }
            }
            categoryTaskList.removeChild(document.getElementById(categoryItem.id));
            myApp.services.categoriesTab.splice(categoryItem.data.i,1);
            localStorage.setItem('tasks', JSON.stringify(myApp.services.categoriesTab));

      };

    },
    removeCateToMenuPage : function () {
      var categoryTaskList = document.querySelector('#listCategoryMenu');
      if(categoryTaskList.childElementCount !== 0){
        for(let i=0;i<myApp.services.categoriesTab.length;i++){
          categoryTaskList.removeChild(document.querySelector('#categoryMenuElem'+i));
        }
      }
    }
  },
  animators: {

    swipe: function(listItem, callback) {
      var animation="";
      if(listItem.parentElement.id === 'pending-list'){
        animation = 'animation-swipe-right';
      }else if(listItem.parentElement.id === 'progress-list'){
        animation = 'animation-swipe-right';
      }
      else if(listItem.parentElement.id === 'completed-list'){
        animation = 'animation-remove';
      }
      listItem.classList.add('hide-children');
      listItem.classList.add(animation);

      setTimeout(function() {
        listItem.classList.remove(animation);
        listItem.classList.remove('hide-children');
        callback();
      }, 950);
    },

    remove: function(listItem, callback) {
      listItem.classList.add('animation-remove');
      listItem.classList.add('hide-children');

      setTimeout(function() {
        callback();
      }, 750);
    }
  },
  fixtures: [
    {
      id:0,
      title: 'Star Onsen UI repo on Github',
      category: 'Category 1',
      description: 'Some description.',
      date: Date(),
      statut: '0',
      urgent: false
    },
    {
      id:1,
      title: 'Visit Japan',
      category: 'Category 1',
      description: 'Some description.',
      date: 'Sun May 10 2020 17:51:55 GMT+0200 (heure d’été d’Europe centrale)',
      statut: '0',
      urgent: false
    }
  ],
  categoriesTab: [
    {
      id:0,
      name: 'Category 1',
    }
  ]
};


