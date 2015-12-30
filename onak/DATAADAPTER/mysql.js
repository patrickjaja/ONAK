'use strict';
/**
 * Created by root on 30.08.2015.
 */

//https://github.com/felixge/node-mysql#preparing-queries
const mysql = require('mysql');
//import sqlException from '../EXCEPTIONS/class.sqlException.js'

class MYSQL {
    constructor(host="localhost", dbname="", user="root", password="") {
        this.dbname=dbname;
        this.host=host;
        this.user=user;
        this.password=password;
        this.connectionLimit = 10;
        this.connection={};
        console.log("MySQL Konstruktor");
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


    }
    _bindEvents() {
        this.pool.on('connection', function (connection) {
            console.log("Database connected");
        });
        this.pool.on('enqueue', function () {
            console.log('Waiting for available connection slot');
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
    debugSQL(query="SELECT * FROM table", values={param:"val"}) {
        var sql = query;
        var inserts = values;
        this.sql = mysql.format(sql, inserts);
        return this.sql;
    }
    //vllt Format umstellen
    sendSQL(query="SELECT * FROM table", values={param:"val"}, debug=false) {
        let promise = new Promise((resolve, reject) => {// do a thing, possibly async, then…
            //if () {
            try {
                if (debug) {
                    this.sql=mysql.format(query, values);
                    resolve(this.sql);
                    console.log("HIER GEHTS WEITER");
                }
                this.pool.getConnection((err, connection) => {
                    if (err) {
                        reject(err);
                    }
                    console.log("connection active");
                    connection.query(query, values, function(err, result) {
                        if (err) {
                            reject(err);
                        }
                        resolve(result);
                    });

                    //connection.release()
                });
            } catch(e) {
                reject(e);
            }
        });
        return promise;
    }
}

module.exports=MYSQL;