/**
 * Created by root on 30.08.2015.
 */
const APIService = require('../../onak/APIService/APIService');
const MYSQL = require('../../onak/dataadapter/adapter/mysql');

class Sessions extends APIService { //extends Error {
    constructor(skey) {
        this.skey=skey;
        console.log("USER CONSTRUKTOR geladen");
    }
    load() {
        let promise = new Promise((resolve, reject) => {
            let db = this.getDB();
            db.sendSQL("SELECT * FROM sessions WHERE ?", {sessionKey:this.skey}).then(function(result) {
                resolve({output:result});
            }).catch(function(err) {
                reject(err);
            });
            console.log("ITEM LOAD");

        });
        return promise;
    }
}

module.exports = Sessions;