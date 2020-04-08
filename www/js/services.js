
myApp.services = {
  tasks: {

    create: function (data) {

      myApp.storage.createTask(data);

      var taskItem = ons.createElement(
        '<ons-list-item tappable category="' + data.description + '">' +
        '<label class="left">' +
        '<ons-checkbox></ons-checkbox>' +
        '</label>' +
        '<div class="center">' +
          data.title +
        '</div>' +
        '<div class="right">' +
        '<ons-icon style="color: grey; padding-left: 4px" icon="ion-ios-trash-outline, material:md-delete"></ons-icon>' +
        '</div>' +
        '</ons-list-item>'
      );

      taskItem.data = data;

      if(taskItem.data.statut === '0'){
        var pendingList = document.querySelector('#pending-list');
        pendingList.insertBefore(taskItem, taskItem.data.urgent ? pendingList.firstChild : null);
      }else if (taskItem.data.statut === '1'){
        var progressList = document.querySelector('#progress-list');
        progressList.insertBefore(taskItem, taskItem.data.urgent ? progressList.firstChild : null);
      }else if (taskItem.data.statut === '2'){
        var completedList = document.querySelector('#completed-list');
        completedList.insertBefore(taskItem, taskItem.data.urgent ? completedList.firstChild : null);
      }

    },
  },
  categories:{
    create: function (data) {

      myApp.storage.createCategory(data);

      var categoryItem = ons.createElement(
          '<ons-list-item tappable>' +
          '<label class="left">' +
          '<ons-radio name="color" input-id="radio-'+data.id+'"></ons-radio>' +
          '</label>' +
          '<label for="radio-'+data.id+'" class="center">' +
           data.name +
          '</label>' +
          '</ons-list-item>'
      );

      categoryItem.data = data;

      var categoryTaskList = document.querySelector('.listCategoryNewTask');
      categoryTaskList.appendChild(categoryItem);

    },
    addToMenuPage: function () {
      myApp.services.categoriesTab.forEach(function (data) {
        var categoryItem = ons.createElement(
            '<ons-list-item id="categoryMenuElem'+data.id+'"tappable>' +
            '<label class="left">' +
            '<ons-radio name="color" input-id="radio-'+data.id+'"></ons-radio>' +
            '</label>' +
            '<label for="radio-'+data.id+'" class="center">' +
            data.name +
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
      });
    },
    removeCateToMenuPage : function () {
      var page = document.querySelector('#menuPage');
      var categoryTaskList = document.querySelector('#listCategoryMenu');
      if(categoryTaskList.childElementCount !== 0){
        for(let i=0;i<myApp.services.categoriesTab.length;i++){
          categoryTaskList.removeChild(document.querySelector('#categoryMenuElem'+i));
        }
      }
    }
  },
  fixtures: [
    {
      id: 0,
      title: 'Download OnsenUUUUI',
      category: 'Programmikkkkng',
      description: 'Some description.',
      date: Date(),
      statut: '2',
      urgent: false
    },
    {
      id:1,
      title: 'Install Monaca CLI',
      category: 'Programming',
      description: 'Some description.',
      date: Date(),
      statut: '0',
      urgent: false
    },
    {
      id:2,
      title: 'Star Onsen UI repo on Github',
      category: 'Super important',
      description: 'Some description.',
      date: Date(),
      statut: '1',
      urgent: false
    },
    {
      id:3,
      title: 'Send donations to Fran and Andreas',
      category: 'Super important',
      description: 'Some description.',
      date: Date(),
      statut: '0',
      urgent: false
    },
    {
      id:4,
      title: 'Profit',
      category: '',
      description: 'Some description.',
      date: Date(),
      statut: '0',
      urgent: false
    },
    {
      id:5,
      title: 'Visit Japan',
      category: 'Travels',
      description: 'Some description.',
      date: Date(),
      statut: '0',
      urgent: false
    }
  ],
  categoriesTab: [
    {
      id:0,
      name: 'Category 1',
    },
    {
      id:1,
      name: 'Category 2',
    }
  ]
};


