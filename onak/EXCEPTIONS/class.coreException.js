/**
 * Created by root on 30.08.2015.
 */
'use strict';
class coreException { //extends Error {
    constructor(message) {
        //super(message);
        this.name = 'coreError';
        this.message = message || 'Default Message';
        this.stack = (new Error()).stack;
    }
}
module.exports=coreException;