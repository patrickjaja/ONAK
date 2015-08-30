var mysql      = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'nodejs'
});
pool.on('connection', function (connection) {

});
pool.on('enqueue', function () {
    console.log('Waiting for available connection slot');
});
pool.config.queryFormat = function (query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {
        if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
        }
        return txt;
    }.bind(this));
};

pool.getConnection(function(err, connection) {
    if (err) throw err;
    // connected! (unless `err` is set)

    connection.config.queryFormat = function (query, values) {
        if (!values) return query;
        return query.replace(/\:(\w+)/g, function (txt, key) {
            if (values.hasOwnProperty(key)) {
                return this.escape(values[key]);
            }
            return txt;
        }.bind(this));
    };

    connection.query("SELECT * FROM node WHERE username = :title", { title: "test1" }, function(err, result) {
     if (err) throw err;
        console.log("GOGO",result);
    });
    connection.release();
});

//pool.connect();

//pool.query("SELECT * FROM node WHERE username = :title", { title: "test1" }, function(err, result) {
   // if (err) throw err;
    //console.log("GOGO",result);
//});





exports.findAll = function(req, res){
    res.send([{
        "id": 1,
        "name": "Max",
        "band": "Maximum Pain",
        "instrument": "guitar"
    }]);
};
exports.findById = function() {};
exports.add = function() {};
exports.update = function() {};
exports.delete = function() {};