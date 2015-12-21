/*
  - API Version einfügen (evtl. mapping übergeben + ohne version = latest)
  - LoadBalancer einfügen (CPU Worker)
 */
'use strict';
let path = require('path');
let Server = require('./onak/server.js');
let ONAKServer = new Server(__dirname+path.sep+"api/");
ONAKServer.start();