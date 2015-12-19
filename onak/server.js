'use strict';
console.log("STARRT");

let express = require('express');
let coreException = require('./EXCEPTIONS/class.coreException.js');
let validator = require('validator');
let chokidar = require('chokidar');
let path = require('path');
//TODO: Prüfen ob die Datei existiert, sonst Fallback auf default.config.json
//TODO: app.config und default.config mergen, damit fehlende configs gefüllt sind
let config = require('../app.config.json');

class Server {
    constructor(name) {
        this.APIDIR = `../api/`;
        this.APIDESCDIR = `./api${path.sep}DESC`;
        this.watchExpr = `${this.APIDESCDIR}${path.sep}*.json`;
        this.name = name;
        this.apiregister = [];
        this.coreParams = ['class','function'];
        this.defaultModuleExtension = ".js";
        this.test=0;
        this.initFileWatcher();
    }
    initFileWatcher() {
        this.watcher = chokidar.watch('file', {
            ignored: /[\/\\]\./, persistent: true
        });

        this.watcher
            .on('add', path => console.log(`File ${path} has been added`))
            .on('change', path => console.log(`File ${path} has been changed`))
            .on('unlink', path => console.log(`File ${path} has been removed`));

        this.watcher.add([this.watchExpr]);
    }
    start() {
        let app = express();

        app.get('/', (req, res) =>  {
            Promise.all([this.parseCoreParams(req.query)])
                .then((data) => {
                    return Promise.all([this.getClass(data)
                                    , this.checkUser(data)]);
                })
                .then((functionObj) => {
                    let funcObj=functionObj[0].response;
                    let funcName=functionObj[0].request[0].request.function;
                    if (typeof(funcObj[funcName]) == "function") {
                        funcObj[funcName].call();
                        funcObj["load"].call();
                        this.test++;
                    }
                })
               .catch(function(err) {
                    console.log(err);
                });
            res.send('Hello World!');
        });

        var server = app.listen(3000, ()=> {
            var host = server.address().address;
            var port = server.address().port;

            console.log('Example app listening at http://%s:%s', host, port);
        });
    }
    checkUser(){

    }
    /*
        params = iterable Object
     */
    parseCoreParams(paramsObj) {
        var promise = new Promise((resolve, reject) => {
            var parsedParams={};
            this.coreParams.forEach((value, key) => {
                var aParam=paramsObj[value];
                if (/[^a-zA-Z0-9]/.test(aParam)) {
                    reject("Not valid Param.", param);
                }
                parsedParams[value] = aParam;
            });
            resolve({response:parsedParams
                    , request: paramsObj});
        });
        return promise;
    }
    getClass(options) {
        let promise = new Promise((resolve, reject) => {// do a thing, possibly async, then…
            //if () {
            try {
                let rqParameters=options[0].response;
                let module=__dirname+path.sep+this.APIDIR+rqParameters["class"]
                                        +this.defaultModuleExtension;
                require.resolve(module);
                let mountedModule=require(module);
                resolve({response:mountedModule, request: options});
            } catch(e) {
                reject(e);
            }
            });
        return promise;
    }
}
module.exports = Server;