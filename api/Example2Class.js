'use strict';

let APIService = require('../onak/APIService/APIService');


class Example2Class extends APIService {
    constructor() {
        console.log("Auftr�ge Konstruktor geladen.");
        super();
    }
    example1Function1(parameter) {
        console.log("Alles geladen");
    }
}
module.exports=new Example2Class();
