import sql from './SQL/class.sql'
import config from './global.config.json'
let express = require('express');

export class Server {
    constructor(name) {
        this.name = name;
    }
    start() {
        let app = express();
        require('../routes')(app);

        app.listen(config.port);

        console.log("Jammin\' on port2 3001...");

    }
}