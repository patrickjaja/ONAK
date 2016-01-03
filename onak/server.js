'use strict';
console.log("STARRT");

const express = require('express');
const coreException = require('./exceptions/class.coreException.js');
const validator = require('validator');
const chokidar = require('chokidar');
const CustomError = require('./exceptions/customError');
const EventEmitter = require('events');

const Loader = require('./loader/loader');

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
        this.version="0.0";
        this.defaultDataadapter="mysql";

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
                    params=data[0].response;
                    return Promise.all([this.getClass(params.class,params.function)]);
                })
                .then((mountedModule) => {

                    if (mountedModule[0].requireUser) {
                        //TODO: GIVE CURRUSER OBJ TO FUNC
                        //return this.checkUser(funcObj)
                    } else {
                        //GO ON WITHOUT USER OBJ
                    }
                    let funcObj= new mountedModule[0](params);
                    let funcName=params.function;
                    if (typeof(funcObj[funcName]) == "function") {
                        return funcObj[funcName](params);
                    } else {
                        this.emit('error', new CustomError("Unknown function."));
                    }
                })
                .then(this.parseAPIServiceResponse)
                .then((preparedOutput) => {
                    return this.outSuccess(preparedOutput,res,startTime);
                })
                .catch((err) => {
                    //Output error to caller
                    this.outNoSuccess(err,res,startTime);
                    //Trigger error event for third party apps
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
                out.status= "OK";
                out.code=200;
                out.version=this.version;
                out.duration= process.hrtime(startTime)[1] / 1000000000;
                this.sendJSON(out,response);
                resolve(content);
            } catch(e) {
                reject(e);
            }
        });
        return promise;
    }
    outNoSuccess(content,response,startTime) {
        let promise = new Promise((resolve, reject) => {
            try {
                let out={};
                //TODO: Check if output is defined, else reject
                out.content=content;
                out.status= "ERROR";
                out.code=500;
                out.version=this.version;
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
    checkUser(options){
        let promise = new Promise((resolve, reject) => {// do a thing, possibly async, then…
            //if () {
            try {
                let rqParameters=options[0].response;
                let user=this.APIDIR+rqParameters["skey"];


                resolve({response:user});
            } catch(e) {
                reject(e);
            }
        });
        return promise;
    }
    loadUser(skey) {

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
    getClass(className) {
        let promise = new Promise((resolve, reject) => {// do a thing, possibly async, then…
            //if () {
            try {
                let module=this.APIDIR+className
                                        +this.defaultModuleExtension;

                //Prevent Webservices to be cached
                delete require.cache[require.resolve(module)];
                let mountedModule=Loader.getFile(module);
                resolve(mountedModule);
            } catch(e) {
                reject(e);
            }
            });
        return promise;
    }
}
module.exports = Server;