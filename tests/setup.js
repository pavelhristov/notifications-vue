require('browser-env')();
window.Date = Date;

require('jsdom-global')();

global.expect = require('expect');
