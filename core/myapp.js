import { install } from 'source-map-support';
install();


mainProcessor();

function mainProcessor() {
    console.log([1,2,3,4,5].map(x => x * x));
}
//throw new Error('Test!');
