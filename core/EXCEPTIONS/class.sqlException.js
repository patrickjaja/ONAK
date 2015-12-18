/**
 * Created by root on 30.08.2015.
 */

export class sqlException extends Error {
    constructor(message) {
        super(message);
        this.name = 'sqlException';
        this.message = message || 'Default Message';
        this.stack = (new Error()).stack;
        throw this;
    }
}