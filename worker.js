// worker.js

const { parentPort, workerData } = require('worker_threads');

function heavyComputation(number) {
    // Some heavy computation
    return number * number;
}

const result = heavyComputation(workerData.number);
parentPort.postMessage(result);
