/**
 * Created by root on 30.08.2015.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _LOGClassLoggingJs = require('../LOG/class.logging.js');

var _LOGClassLoggingJs2 = _interopRequireDefault(_LOGClassLoggingJs);

var _EXCEPTIONSClassSqlExceptionJs = require('../EXCEPTIONS/class.sqlException.js');

var _EXCEPTIONSClassSqlExceptionJs2 = _interopRequireDefault(_EXCEPTIONSClassSqlExceptionJs);

var MYSQL = (function () {
    function MYSQL() {
        var host = arguments.length <= 0 || arguments[0] === undefined ? "localhost" : arguments[0];
        var dbname = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
        var user = arguments.length <= 2 || arguments[2] === undefined ? "root" : arguments[2];
        var password = arguments.length <= 3 || arguments[3] === undefined ? "" : arguments[3];

        _classCallCheck(this, MYSQL);

        this.dbname = dbname;
        this.host = host;
        this.user = user;
        this.password = password;
        this.connectionLimit = 10;
        this.connect();
    }

    _createClass(MYSQL, [{
        key: 'connect',
        value: function connect() {
            this.pool = _mysql2['default'].createPool({
                connectionLimit: this.connectionLimit,
                host: this.host,
                user: this.user,
                password: this.password,
                database: this.dbname
            });

            this._bindEvents();

            this._applyPoolConfig();

            this.pool.getConnection(function (err, connection) {
                if (err) {
                    new _EXCEPTIONSClassSqlExceptionJs2['default'](err);
                }
                this.connection = connection;
            });
        }
    }, {
        key: '_bindEvents',
        value: function _bindEvents() {
            this.pool.on('connection', function (connection) {
                _LOGClassLoggingJs2['default'].log("Database connected");
            });
            this.pool.on('enqueue', function () {
                _LOGClassLoggingJs2['default'].log('Waiting for available connection slot');
            });
        }
    }, {
        key: '_applyPoolConfig',
        value: function _applyPoolConfig() {
            this.pool.config.queryFormat = function (query, values) {
                if (!values) return query;
                return query.replace(/\:(\w+)/g, (function (txt, key) {
                    if (values.hasOwnProperty(key)) {
                        return this.escape(values[key]);
                    }
                    return txt;
                }).bind(this));
            };
        }
    }, {
        key: 'prepSQL',
        value: function prepSQL(query) {
            //2bd
        }
    }, {
        key: 'sendSQL',
        value: function sendSQL() {
            var query = arguments.length <= 0 || arguments[0] === undefined ? "SELECT * FROM table" : arguments[0];
            var values = arguments.length <= 1 || arguments[1] === undefined ? { param: "val" } : arguments[1];

            this.connection.query(query, values, function (err, result) {
                if (err) {
                    new _EXCEPTIONSClassSqlExceptionJs2['default'](err);
                }
                _LOGClassLoggingJs2['default'].log("GOGO", result);
            });
            //this.connection.query("SELECT * FROM `users` WHERE username = :title", { title: "test1" }, function(err, result) {
            //    if (err) throw err;
            //    console.log("GOGO",result);
            //});
            this.connection.release();
        }
    }]);

    return MYSQL;
})();

exports.MYSQL = MYSQL;

//# sourceMappingURL=class.mysql-compiled.js.map
//# sourceMappingURL=../SQL/class.mysql-compiled.js.map