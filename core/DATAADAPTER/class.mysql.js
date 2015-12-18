/**
 * Created by root on 30.08.2015.
 */
import mysql from 'mysql'
import l from '../LOG/class.logging.js'
import sqlException from '../EXCEPTIONS/class.sqlException.js'

export class MYSQL {
    constructor(host="localhost", dbname="", user="root", password="") {
        this.dbname=dbname;
        this.host=host;
        this.user=user;
        this.password=password;
        this.connectionLimit = 10;
        this.connect();
    }
    connect() {
        this.pool  = mysql.createPool({
            connectionLimit : this.connectionLimit,
            host            : this.host,
            user            : this.user,
            password        : this.password,
            database        : this.dbname
        });

        this._bindEvents();

        this._applyPoolConfig();

        this.pool.getConnection(function(err, connection) {
            if (err) {
                new sqlException(err);
            }
            this.connection=connection;
        });
    }
    _bindEvents() {
        this.pool.on('connection', function (connection) {
            l.log("Database connected");
        });
        this.pool.on('enqueue', function () {
            l.log('Waiting for available connection slot');
        });
    }
    _applyPoolConfig() {
        this.pool.config.queryFormat = function (query, values) {
            if (!values) return query;
            return query.replace(/\:(\w+)/g, function (txt, key) {
                if (values.hasOwnProperty(key)) {
                    return this.escape(values[key]);
                }
                return txt;
            }.bind(this));
        };
    }
    prepSQL(query) {
        //2bd
    }
    sendSQL(query="SELECT * FROM table", values={param:"val"}) {
        this.connection.query(query, values, function(err, result) {
            if (err) {
                new sqlException(err);
            }
            l.log("GOGO",result);
        });
        //this.connection.query("SELECT * FROM `users` WHERE username = :title", { title: "test1" }, function(err, result) {
        //    if (err) throw err;
        //    console.log("GOGO",result);
        //});
        this.connection.release();
    }
}