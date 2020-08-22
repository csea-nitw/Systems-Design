const mapReduce = require('./map_reduce');

function reduce(key, values) {
    const valuesCount = values.length;
    //passing filename i.e. key and count of no of ones in shuffled file which are aggregated by shuffle function
    mapReduce.emitReduceResult(key, valuesCount);
}


const reduceInputs = mapReduce.getReduceInputs();
    for(const input of reduceInputs) {
        reduce(input[0], input[1]);
}