/**
 * Created by root on 30.08.2015.
 */

const Loader = require('../loader/loader');

class APIService  { //extends Error {
    constructor() {
        console.log("ITEM CONSTRUKTOR geladen");
    }
    load() {
        console.log("ITEM LOAD");
    }
    getFile(path) {
        var fs = require('fs');
        var check = require('syntax-error');

        var file = path;
        var src = fs.readFileSync(file);

        var err = check(src, file);
        if (err) {
            console.error('ERROR DETECTED' + Array(62).join('!'));
            console.error(err);
            console.error(Array(76).join('-'));
        }
        try {
            require.resolve(path);
        } catch (e) {
            return e;
        }
        //without caching ~30 ms +++
        //delete require.cache[require.resolve(path)];
        return require(path);
    }
    getDB() {
        let db= new (this.getFile(__dirname+'/../dataadapter/Dataadapter.js'))();
        let mydb=db.getDB();
        return mydb;
    }
    //loadFile(path) {
    //    var fs = require('fs');
    //    var check = require('syntax-error');
    //
    //    var file = path;
    //    var src = fs.readFileSync(file);
    //
    //    var err = check(src, file);
    //    if (err) {
    //        console.error('ERROR DETECTED' + Array(62).join('!'));
    //        console.error(err);
    //        console.error(Array(76).join('-'));
    //    }
    //    try {
    //        require.resolve(path);
    //    } catch (e) {
    //        return e;
    //    }
    //    return require(path);
    //}
}

module.exports = APIService;