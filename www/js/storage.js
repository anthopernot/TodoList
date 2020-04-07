
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
            localStorage.clear();
            myApp.controllers.hideAlertDialog();
            console.log('LocalStorage vidé.');
        }
        else {
            console.log("LocalStorage n'est pas disponible.");
        }
    },
    createTask: function (data) {
        if (myApp.storage.storageAvailable('localStorage')) {
            localStorage.setItem('sizeData',  myApp.services.fixtures.length);
            localStorage.setItem('id', String(Number(myApp.storage.i)));
            localStorage.setItem('title', data.title);
            localStorage.setItem('category', data.category);
            localStorage.setItem('description', data.description);
            localStorage.setItem('date', data.date);
            localStorage.setItem('statut', String(0));
            localStorage.setItem('urgent', data.urgent);

            myApp.storage.i++;

        }
        else {
            console.log("LocalStorage n'est pas disponible.");
        }
    },
    createCategory:function (data) {
        if (myApp.storage.storageAvailable('localStorage')) {
            localStorage.setItem('id', String(Number(myApp.storage.i)));
            localStorage.setItem('name', data.name);

            myApp.storage.i++;
        }
        else {
            console.log("LocalStorage n'est pas disponible.");
        }
    }
};


