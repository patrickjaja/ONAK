const APIService = require('../onak/APIService/APIService');
const Loader = require('../onak/loader/loader');

class Example1Class extends APIService {
    constructor() {
        console.log("Aufträge Konstruktor geladen.");
        super();
    }
    example1Function1(parameter) {
        //let mysqlObj=new MySQL("");
        let mysql = this.getFile(__dirname+'/../onak/dataadapter/mysql.js');
        console.log("Alles geladen");
    }
}
module.exports=new Example1Class();
