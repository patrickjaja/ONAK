const APIService = require('../onak/APIService/APIService');
const Loader = require('../onak/loader/loader');

class Example1Class extends APIService {
    constructor() {
        console.log("Auftr�ge Konstruktor geladen.1112");
        super();
    }
    example1Function1(parameter) {
        //let mysqlObj=new MySQL("");
        let mysql = this.getFile(__dirname+'/../onak/dataadapter/mysql.js');
        console.log("Alles geladen24");
    }
}
module.exports=Example1Class;
