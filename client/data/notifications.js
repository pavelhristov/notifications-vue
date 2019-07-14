export default (function () {
    let notifications = [
        {
            id: 1321,
            type: 'text',
            title: 'Test notification',
            text: 'Test text notification',
            expires: 3600
        },
        {
            id: 4322,
            type: 'bonus',
            title: 'You win a bonus!',
            requirement: 'Deposit $50 to win',
            expires: 3600
        },
        {
            id: 5453,
            type: 'Promotion',
            image: 'https://www.freeiconspng.com/uploads/leistungen-promotion-icon-png-0.png',
            title: '%30 off on sports betting',
            link: 'https://www.google.com/'
        },
        {
            id: 5236,
            type: 'text',
            title: 'Test notification',
            text: 'Test text notification',
            expires: 5
        }
    ];

    let currentId = Math.max.apply(Math, notifications.map(function (o) { return o.id; }));

    return {
        getAll: () => Promise.resolve(JSON.parse(JSON.stringify(notifications))),
        add(notification) {
            return Promise.resolve().then(() => {
                notification.id = ++currentId;
                notifications.push(notification);
            });
        },
        delete(id) {
            return Promise.resolve().then(() => {
                let index = notifications.map(x => x.id).indexOf(id);
                if (index > -1) {
                    notifications.splice(index, 1);
                } else {
                    return Promise.reject(`Notification with id ${id} was not found!`);
                }
            });
        }
    };
})();
