/**
 * Created by root on 30.08.2015.
 */

class APIService { //extends Error {
    constructor(message) {
        console.log("ITEM CONSTRUKTOR geladen");
    }
    load() {
        console.log("ITEM LOAD");
    }
    /**Default API Functions**/
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
        return require(path);
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