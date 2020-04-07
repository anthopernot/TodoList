
myApp.services = {
  tasks: {

    create: function (data) {

      myApp.storage.createTask(data);

      var taskItem = ons.createElement(
        //'<ons-list-item tappable category="' + myApp.services.categories.parseId(data.category)+ '">' +
        '<ons-list-item tappable category="' + localStorage.getItem('description') + '">' +
        '<label class="left">' +
        '<ons-checkbox></ons-checkbox>' +
        '</label>' +
        '<div class="center">' +
          localStorage.getItem('title') +
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
          '<ons-radio name="color" input-id="radio-'+localStorage.getItem('id')+'"></ons-radio>' +
          '</label>' +
          '<label for="radio-'+localStorage.getItem('id')+'" class="center">' +
          localStorage.getItem('name') +
          '</label>' +
          '</ons-list-item>'
      );

      categoryItem.data = data;

      var categoryTaskList = document.querySelector('.listCategoryNewTask');
      categoryTaskList.appendChild(categoryItem);

    }
  },
  fixtures: [
    {
      title: 'Download OnsenUUUUI',
      category: 'Programmikkkkng',
      description: 'Some description.',
      date: Date(),
      statut: '2',
      urgent: false
    },
    {
      title: 'Install Monaca CLI',
      category: 'Programming',
      description: 'Some description.',
      date: Date(),
      statut: '0',
      urgent: false
    },
    {
      title: 'Star Onsen UI repo on Github',
      category: 'Super important',
      description: 'Some description.',
      date: Date(),
      statut: '1',
      urgent: false
    },
    {
      title: 'Send donations to Fran and Andreas',
      category: 'Super important',
      description: 'Some description.',
      date: Date(),
      statut: '0',
      urgent: false
    },
    {
      title: 'Profit',
      category: '',
      description: 'Some description.',
      date: Date(),
      statut: '0',
      urgent: false
    },
    {
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
      name: 'Category 1',
    },
    {
      name: 'Category 2',
    }
  ]
};
