'use strict';

let Item = require('../onak/ITEM/class.Item.js');


class Orders extends Item {
    constructor() {
     console.log("Auftr�ge Konstruktor geladen.");
        super();
    }
    loadAll() {
        console.log("Alles geladen");
    }
}
module.exports=new Orders();
