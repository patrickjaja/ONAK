/**
 * Created by root on 30.08.2015.
 */
var method = SQL.prototype;

function SQL(age) {
    this._age = age;
}

method.prepSQL = function() {
    return this._age;
};

method.sendSQL = function() {
    return this._age;
};

method.debugSQL = function() {
    return this._age;
};

module.exports = SQL;