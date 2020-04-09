
myApp.storage = {
    storageAvailable: function (type) {
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                    // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage.length !== 0;
        }
    },
    deleteAllTasks: function () {
        if (myApp.storage.storageAvailable('localStorage')) {
            window.localStorage.removeItem('tasks');
           if( myApp.services.tasks.removeTaskToHomePage() ){
               console.log('LocalStorage vidé.');
           }
            myApp.controllers.hideAlertDialog();
        }
        else {
            console.log("LocalStorage n'est pas disponible.");
        }
    },
    createTask: function (data) {
        if (myApp.storage.storageAvailable('localStorage')) {
            var taskJSON = {
                id: myApp.services.fixtures.length,
                title: data.title,
                category: data.category,
                description: data.description,
                date: data.date,
                statut: 0,
                urgent: data.urgent
            };
            myApp.services.fixtures.push( taskJSON );
            localStorage.setItem('tasks', myApp.services.fixtures);
        }
        else {
            console.log("LocalStorage n'est pas disponible.");
        }
    },
    createCategory: function (data) {
        if (myApp.storage.storageAvailable('localStorage')) {
            var cateJSON = {
              id:myApp.services.categoriesTab.length,
              name:data.name
            };
            myApp.services.categoriesTab.push(cateJSON);
            localStorage.setItem('categories', myApp.services.categoriesTab);
            myApp.services.categories.create(cateJSON);
        }
        else {
            console.log("LocalStorage n'est pas disponible.");
        }
    },
    /**
     * A REFAIRE
     * @param data

    createCategoryForInput: function (data) {
        if (myApp.storage.storageAvailable('localStorage')) {
            var cateJSON = {
                id: myApp.services.categoriesTab.length,
                name: data
            };
            myApp.services.categoriesTab.push(cateJSON);
            localStorage.setItem('categories', myApp.services.categoriesTab);
            myApp.services.categories.create(cateJSON);
        }
        else {
            console.log("LocalStorage n'est pas disponible.");
        }
    }*/
};


