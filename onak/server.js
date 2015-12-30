'use strict';
console.log("STARRT");

const express = require('express');
const coreException = require('./exceptions/class.coreException.js');
const validator = require('validator');
const chokidar = require('chokidar');
const CustomError = require('./exceptions/customError');
const EventEmitter = require('events');

const Loader = require('../onak/loader/loader');

const path = require('path');
//TODO: Prüfen ob die Datei existiert, sonst Fallback auf default.config.json
//TODO: app.config und default.config mergen, damit fehlende configs gefüllt sind
//http://localhost:3000/?class=Example1Class&function=example1Function1
let config = require('../app.config.json');

let myObject = {};


/**
 * ONAK Server Events:
 *  - error
 *  - started
 *  - onAPICall
 * */
class Server extends EventEmitter{
    constructor(apiDir) {
        //EventEmitter.call(this);
        super();
        this.BASEDIR = __dirname;
        this.APIDIR = apiDir;
        this.watchExpr = `${this.APIDIR}${path.sep}**/*.json`;
        this.apiRegister = {};
        this.coreParams = ['class','function'];
        this.defaultModuleExtension = ".js";
        this.test=0;

        this.parsedAPI={};
        /****STATS***/
        this.serverUpTime="";
        this.incommingRequests="";

        /**PRIVATE**/
        this._rawAPI = [];

        this.setup();
        this.emit('started', "");
        console.log("Cons");
    }
    setup() {
        this.initFileWatcher();
    }
    initFileWatcher() {
        this.watcher = chokidar.watch('file', {
            ignored: /[\/\\]\./, persistent: true
        });

        this.watcher
            .on('add', (watchPath) => {
                this.parseAPIFile(watchPath);
            })
            .on('change', watchPath => {
                this.parseAPIFile(watchPath);
            })
            .on('unlink', watchPath => {
                this.parseAPIFile(watchPath);
            });

        this.watcher.add([this.watchExpr]);
    }
    parseAPIFile(apiFilePath) {
        try {

            require.resolve(apiFilePath);

            let file=require(apiFilePath);
            let className=file.className;
            this._rawAPI.push(file);
            if (!className) {
                throw(apiFilePath + " undefined className");
            }
            this.parsedAPI[className]=file;
        } catch (e) {
            console.log(e);
        }

    }
    start() {
        //TODO: Check performance by using the basic http server
        let app = express();

        app.get('/', (req, res) =>  {
            let startTime=process.hrtime();
            let stopTime=0;
            let params={};
            Promise.all([this.parseCoreParams(req.query)])
                .then((data) => {
                    return Promise.all([this.getClass(data)
                                    , this.checkUser(data)]);
                })
                .then((functionObj) => {
                    let funcObj=functionObj[0].response;
                    let funcName=functionObj[0].request[0].request.function;
                    let parameters={};
                    if (typeof(funcObj[funcName]) == "function") {
                        this.emit('onAPICall', {
                            'func': funcObj[funcName]
                            ,'functionObj': functionObj, funcName
                        });
                        return funcObj[funcName](parameters);
                    } else {
                        this.emit('error', new CustomError("Unknown function."));
                    }
                })
                .then(this.parseAPIServiceResponse)
                .then((preparedOutput) => {
                    return this.outSuccess(preparedOutput,res,startTime);
                })
                .catch((err) => {
                     this.emit('error', new CustomError(err));
                 });
        });

        let server = app.listen(3000, ()=> {
            let host = server.address().address;
            let port = server.address().port;

            console.log('Example app listening at http://%s:%s', host, port);
        });
    }
    outSuccess(content,response,startTime) {
        let promise = new Promise((resolve, reject) => {
            try {
                let out={};
                //TODO: Check if output is defined, else reject
                out.content=content.output;
                out.duration= process.hrtime(startTime)[1] / 1000000000;
                this.sendJSON(out,response);
                resolve(content);
            } catch(e) {
                reject(e);
            }
        });
        return promise;
    }
    sendJSON(o,r) {
        r.setHeader('Content-Type', 'application/json');
        r.send(JSON.stringify(o));
    }
    parseAPIServiceResponse(apiResponse) {
        let promise = new Promise((resolve, reject) => {
            try {
                //TODO: Parse Output? UTF8 Encoding?
                resolve(apiResponse);
            } catch(e) {
                reject(e);
            }
        });
        return promise;
    }
    checkUser(){

    }
    /*
        params = iterable Object
     */
    parseCoreParams(paramsObj) {
        let promise = new Promise((resolve, reject) => {
            let parsedParams={};
            let allParams={};
            //ToDO: Mit klassen Funktionsparams mergen damit alle gewünschten Params der Funktion übergeben werden können
            for (let value in paramsObj) {
                let aParam=paramsObj[value];
                if ((this.coreParams.indexOf(value) > -1)) {

                    //if (/[^a-zA-Z0-9]/.test(aParam)) {
                    //    reject("Not valid Param.", param);
                    //}
                    parsedParams[value] = aParam;
                }
                allParams[value] = aParam;
            }

            resolve({response:allParams
                    , request: paramsObj});
        });
        return promise;
    }
    getClass(options) {
        let promise = new Promise((resolve, reject) => {// do a thing, possibly async, then…
            //if () {
            try {
                let rqParameters=options[0].response;
                let module=this.APIDIR+rqParameters["class"]
                                        +this.defaultModuleExtension;

                //Prevent Webservices to be cached
                delete require.cache[require.resolve(module)];
                let mountedModule=Loader.getFile(module);

                mountedModule=new mountedModule();
                resolve({response:mountedModule, request: options});
            } catch(e) {
                reject(e);
            }
            });
        return promise;
    }
}
module.exports = Server;