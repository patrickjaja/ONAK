/**
 * Created by root on 30.08.2015.
 */
const APIService = require('../../onak/APIService/APIService');
const MYSQL = require('../../onak/dataadapter/adapter/mysql');

class User extends APIService { //extends Error {
    constructor(skey) {
        this.skey=skey;
        this.db=false;
        console.log("USER CONSTRUKTOR geladen");
    }
    load() {
        let db = this.getDB();
        db.sendSQL("SELECT * FROM sessions WHERE ?", {userUID:"pschoen"}).then(function(result) {
            resolve({output:result});
        }).catch(function(err) {
            reject(err);
        });
        console.log("ITEM LOAD");
    }
}

module.exports = User;