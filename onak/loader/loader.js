/**
 * Created by root on 30.08.2015.
 */
'use strict';
class Loader { //extends Error {
    constructor() {

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
}

module.exports = new Loader();