'use strict';

let Item = require('../onak/item/class.Item.js');


class Example2Class extends Item {
    constructor() {
        console.log("Aufträge Konstruktor geladen.");
        super();
    }
    example1Function1(parameter) {
        console.log("Alles geladen");
    }
}
module.exports=new Example2Class();
