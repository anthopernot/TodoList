
myApp.storage = {
    i:0,
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
    deleteAll: function () {
        if (myApp.storage.storageAvailable('localStorage')) {
            window.localStorage.removeItem('fixtures');
            myApp.controllers.hideAlertDialog();
            console.log('LocalStorage vidé.');
        }
        else {
            console.log("LocalStorage n'est pas disponible.");
        }
    },
    /**
     * A REFAIRE
     * @param data
     */
    createTask: function (data) {
        if (myApp.storage.storageAvailable('localStorage')) {

            var taskJSON = {
                "id": window.localStorage.setItem('id', String(Number(myApp.storage.i))),
                "title": window.localStorage.setItem('title', data.title),
                "category": window.localStorage.setItem('category', data.category),
                "description" : window.localStorage.setItem('description', data.description),
                "date": window.localStorage.setItem('date', data.date),
                "statut": window.localStorage.setItem('statut', String(0)),
                "urgent": window.localStorage.setItem('urgent', data.urgent)
            };

            myApp.services.fixtures.push(JSON.stringify(taskJSON));
            myApp.storage.i++;
        }
        else {
            console.log("LocalStorage n'est pas disponible.");
        }
    },
    /**
     * A REFAIRE
     * @param data
     */
    createCategory: function (data) {
        if (myApp.storage.storageAvailable('localStorage')) {
            //myApp.services.categoriesTab.push(window.localStorage.setItem('id', String(Number(myApp.storage.i++))));
            //myApp.services.categoriesTab.push(window.localStorage.setItem('name', data.name));

                             /**
                                var cateJSON = {
                                    "id":  window.localStorage.setItem('id', String(Number(myApp.storage.i))),
                                    "name": window.localStorage.setItem('name', data.name),
                                };
                                myApp.services.categoriesTab.push(JSON.stringify(cateJSON));
                            */

            //myApp.storage.i++;
        }
        else {
            console.log("LocalStorage n'est pas disponible.");
        }
    },
    /**
     * A REFAIRE
     * @param data
     */
    createCategoryForInput: function (data) {
        if (myApp.storage.storageAvailable('localStorage')) {
            var cateJSON = {
                "id":  window.localStorage.setItem('id', String(Number(myApp.storage.i))),
                "name": window.localStorage.setItem('name', data),
            };
            myApp.services.categoriesTab.push(JSON.stringify(cateJSON));
            myApp.services.categories.create(JSON.stringify(cateJSON));
        }
        else {
            console.log("LocalStorage n'est pas disponible.");
        }
    }
};


