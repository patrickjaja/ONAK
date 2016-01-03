const APIService = require('../../onak/APIService/APIService');


class Example1Class extends APIService {
    constructor() {

        console.log("Auftr�ge Konstruktor geladen.1112");
        super();
        //this.requireUser=true;
    }
    example1Function1(parameter) {
        let promise = new Promise((resolve, reject) => {// do a thing, possibly async, then…
            try {
                let db = this.getDB();
                db.sendSQL("SELECT * FROM user WHERE ?", {userUID:"pschoen"}).then((result) => {
                resolve({output:result});
            }).catch(function(err) {
                reject(err);
            });
            } catch(e) {
                reject(e);
            }
        });
        return promise;
    }
}
//public static service configuration
Example1Class.requireUser=true;
module.exports=Example1Class;
