'use strict';

var _sourceMapSupport = require('source-map-support');

(0, _sourceMapSupport.install)();

mainProcessor();

function mainProcessor() {
    console.log([1, 2, 3, 4, 5].map(function (x) {
        return x * x;
    }));
}
//throw new Error('Test!');
//# sourceMappingURL=myapp.js.map