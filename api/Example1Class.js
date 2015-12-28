const APIService = require('../onak/APIService/APIService');
const Loader = require('../onak/loader/loader');

class Example1Class extends APIService {
    constructor() {
        console.log("Auftr�ge Konstruktor geladen.1112");
        super();
    }
    example1Function1(parameter,response) {
        let promise = new Promise((resolve, reject) => {// do a thing, possibly async, then…
            try {
                let mysql = this.getFile(__dirname+'/../onak/dataadapter/mysql.js');
                resolve("HUHU");
                //let mysqlObj=new mysql("localhost", "trace2", "root", "ZuDQOqtmqlFLeHQ2x39c");
                //mysqlObj.sendSQL("SELECT * FROM user", {param:"val"}).then(function(result) {
                //    console.log("Results:");
                //    resolve({response:result});
                //}).catch(function(err) {
                //    reject(err);
                //});
            } catch(e) {
                reject(e);
            }
        });
        return promise;
    }
}
module.exports=Example1Class;
