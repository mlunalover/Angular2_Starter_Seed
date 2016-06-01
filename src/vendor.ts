import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');

// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router-deprecated';

// RxJS
import 'rxjs';

// Other vendors for example jQuery, Lodash or Bootstrap
// You can import js, ts, css, sass, ...
require('expose?$!expose?jQuery!jquery');

import 'bootstrap';

// Font awesome
import 'font-awesome-webpack';

// Tether is needed for bootstrap popovers
import 'tether';

// Import styles for the app
import './less/styles.less';

