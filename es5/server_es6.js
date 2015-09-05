'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _SQLClassMysqlJs = require('./SQL/class.mysql.js');

var _SQLClassMysqlJs2 = _interopRequireDefault(_SQLClassMysqlJs);

var _globalConfigJson = require('./global.config.json');

var _globalConfigJson2 = _interopRequireDefault(_globalConfigJson);

var express = require('express');

var Server = (function () {
    function Server(name) {
        _classCallCheck(this, Server);

        this.name = name;
    }

    _createClass(Server, [{
        key: 'start',
        value: function start() {
            //let app = express();
            //require('../routes')(app);
            //
            //app.listen(config.port);
            //
            //console.log("Jammin\' on port2 3001...");
            var mytest = new _SQLClassMysqlJs2['default'].MYSQL();
        }
    }]);

    return Server;
})();

exports.Server = Server;
//# sourceMappingURL=server_es6.js.map