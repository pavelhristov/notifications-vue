### vue.js assignment

- no style libraries (Bootstrap, etc)
- must use preprocessor (SCSS, Stylus, etc)
- must use Vue and Vuex
- API must be mocked

"Notifications" component

There can be 3 main types of notifications: text, bonus, promotion and the data which comes from the API is in the following format

```json
[
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
    image: 'https://www.freeiconspng.com/uploads/leistungen-promotion-icon-png-0.png'
    title: '%30 off on sports betting',
    link: 'https://www.google.com/',
  },
  {
    id: 5236,
    type: 'text',
    title: 'Test notification',
    text: 'Test text notification',
    expires: 5
  }
]
```

- When a notification expires it should be removed from the notification list. Some notifications do not have an expiration.
- The menu should be opened/closed by a "Notifications (0)" button which shows the number of active notifications. Notifications of type bonus should not be counted in the notification count badge.
- When the API returns new notifications they should be added to the notifications list
- When the API returns a response where some notifications are missing they should be removed from the list
- When the API returns new data for a specific notification it should be updated in the list
- You can use this example design http://andresclavijo.com/wp-content/uploads/2015/10/Notification_dropdown.jpg

Bonus:
- Opening and closing the notification menu should be animated
- Adding and removing items in the notification list should be animated


-------------------------------------------------------------------------------------
### How to run:

node.js and npm are required dependencies.
```bash
$ npm run build
$ npm start
```
Note: ```$ npm run build``` will install packages and build in production mode, alternatively ```$ npm run build:dev``` or ```$ npm run build:prod``` can be used to build in specific webpack config without installing packages.
