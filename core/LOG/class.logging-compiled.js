/**
 * Created by root on 30.08.2015.
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var logging = (function () {
    function logging() {
        _classCallCheck(this, logging);
    }

    _createClass(logging, null, [{
        key: "log",

        //constructor() {
        //super(text);
        //console.log(text);
        //}
        value: function log(text) {
            console.log(text);
        }
    }]);

    return logging;
})();

exports.logging = logging;

//# sourceMappingURL=class.logging-compiled.js.map