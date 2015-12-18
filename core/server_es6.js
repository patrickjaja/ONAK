//import sql from './DATAADAPTER/class.mysql.js'
'use strict';
console.log("STARRT");
var test = "TEST";
let config = require('./global.config.json');
let express = require('express');
////
class Server {
    constructor(name) {
        this.APIDIR = "API/";
        this.name = name;
        this.apiregister = [];
    }
    start() {
        let app = express();
        //require('../routes')(app);
        //
        app.get('/', (req, res) =>  {
            let className=this.parseParam(req.param('class'));
            let functionName=this.parseParam(req.param('function'));
            let skey=this.parseParam(req.param('skey'));
            //Bedingung 1 "Suche Funktion",
            //Bedingung 2 "Checke Permission"
            Promise.all([this.getClass({className,functionName}),this.checkUser(skey)]).then((functionObj) => {
                var funcObj=functionObj[0].result;
                var funcName=functionObj[0].params.functionName;
                if (typeof(funcObj[funcName]) == "function") {
                    funcObj[funcName].call();
                }

            }).catch(function(err) {
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
    parseParam(param) {
        return param;
    }
    getClass(options) {
        var promise = new Promise((resolve, reject) => {// do a thing, possibly async, then…
            //if () {
            try {
                var module=__dirname+"\\"+this.APIDIR+options.className+".js";
                //console.log(__dirname);
                require.resolve(module);
                resolve({result:require(module), params: options});
            } catch(e) {
                reject(e);
            }


            //}
            //else {
            //    reject(Error("It broke"));
            //}
        });
        return promise;
    }
}
//////module.exports = Server;
let server = new Server("test");
server.start();
console.log("DOOONE");