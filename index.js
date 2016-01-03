/*
  - API Version einfügen (evtl. mapping übergeben + ohne version = latest)
  - LoadBalancer einfügen (CPU Worker)
 */

const path = require('path');
const Server = require('./onak/server.js');
let ONAKServer = new Server(__dirname+path.sep+"api/services/");
let myerr = {}

ONAKServer.start();

ONAKServer.on('error', function(err){
  // handle the error safely
  console.log(err);
  Error.captureStackTrace(myerr);
});
ONAKServer.on('started', function(serverInstance) {
  console.log("ONAK Server started.");
});
ONAKServer.on('onAPICall', function(serverInstance) {
  console.log("ONAK onAPICall "+serverInstance.funcName);
});
