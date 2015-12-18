/**
 * Created by root on 30.08.2015.
 */

export class SQL {
    constructor(dbname="", host="localhost", user="root", password="") {
        this.dbname=dbname;
        this.host=host;
        this.user=user;
        this.password=password;

        var mysql      = require('mysql');
        this.pool  = mysql.createPool({
            connectionLimit : 10,
            host            : 'localhost',
            user            : 'root',
            password        : '',
            database        : 'nodejs'
        });

    }
    connect() {
        let app = express();
        require('../routes')(app);

        app.listen(config.port);

        console.log("Jammin\' on port2 3001...");

    }
    prepSQL() {
        let app = express();
        require('../routes')(app);

        app.listen(config.port);

        console.log("Jammin\' on port2 3001...");

    }
    sendSQL() {
        let app = express();
        require('../routes')(app);

        app.listen(config.port);

        console.log("Jammin\' on port2 3001...");

    }
}