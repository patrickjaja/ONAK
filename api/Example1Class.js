'use strict';

let Item = require('../onak/item/class.Item.js');


class Example1Class extends Item {
    constructor() {
        console.log("Auftr�ge Konstruktor geladen.");
        super();
    }
    example1Function1(parameter) {
        console.log("Alles geladen");
    }
}
module.exports=new Example1Class();
