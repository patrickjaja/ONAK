/*
  - API Version einfügen (evtl. mapping übergeben + ohne version = latest)
  - LoadBalancer einfügen (CPU Worker)
 */
'use strict';
let Server = require('./onak/server.js');
let ONAKServer = new Server();
ONAKServer.start();