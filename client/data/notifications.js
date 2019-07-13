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


    return {
        getAll: () => Promise.resolve(JSON.parse(JSON.stringify(notifications)))
    };
})();
