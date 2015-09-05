/**
 * Created by root on 30.08.2015.
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = (function () {
        function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
                }
        }return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
})();

function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
        }
}

var SQL = (function () {
        function SQL() {
                var dbname = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
                var host = arguments.length <= 1 || arguments[1] === undefined ? "localhost" : arguments[1];
                var user = arguments.length <= 2 || arguments[2] === undefined ? "root" : arguments[2];
                var password = arguments.length <= 3 || arguments[3] === undefined ? "" : arguments[3];

                _classCallCheck(this, SQL);

                this.dbname = dbname;
                this.host = host;
                this.user = user;
                this.password = password;

                var mysql = require('mysql');
                this.pool = mysql.createPool({
                        connectionLimit: 10,
                        host: 'localhost',
                        user: 'root',
                        password: '',
                        database: 'nodejs'
                });
        }

        _createClass(SQL, [{
                key: "connect",
                value: function connect() {
                        var app = express();
                        require('../routes')(app);

                        app.listen(config.port);

                        console.log("Jammin\' on port2 3001...");
                }
        }, {
                key: "prepSQL",
                value: function prepSQL() {
                        var app = express();
                        require('../routes')(app);

                        app.listen(config.port);

                        console.log("Jammin\' on port2 3001...");
                }
        }, {
                key: "sendSQL",
                value: function sendSQL() {
                        var app = express();
                        require('../routes')(app);

                        app.listen(config.port);

                        console.log("Jammin\' on port2 3001...");
                }
        }]);

        return SQL;
})();

exports.SQL = SQL;

//# sourceMappingURL=super.sql-compiled.js.map
//# sourceMappingURL=../SQL/super.sql-compiled.js.map