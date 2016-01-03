'use strict';
/**
 * Created by root on 30.08.2015.
 */
const mysql=require('./adapter/mysql');

class Dataadapter {
    constructor() {

    }
    getDB() {
        //TODO: Credentials central and dynamic
        let mysqlObj = new mysql("localhost", "trace2", "root", "ZuDQOqtmqlFLeHQ2x39c");
        return mysqlObj;
    }
}

module.exports=Dataadapter;