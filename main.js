// // main.js
// 
// const { Worker } = require('worker_threads');
// 
// function runWorker(workerData) {
//     return new Promise((resolve, reject) => {
//         const worker = new Worker('./worker.js', { workerData });
// 
//         worker.on('message', resolve);
//         worker.on('error', reject);
//         worker.on('exit', (code) => {
//             if (code !== 0)
//                 reject(new Error(`Worker stopped with exit code ${code}`));
//         });
//     });
// }
// 
// (async () => {
//     try {
//         const result = await runWorker({ number: 42 });
//         console.log('Result from worker:', result);
//     } catch (err) {
//         console.error(err);
//     }
// })();

// main.js

const { Worker } = require('worker_threads');

function runWorker(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData });

        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
}

async function runMultipleWorkers() {
    const numberOfWorkers = 10;
    const promises = [];

    for (let i = 0; i < numberOfWorkers; i++) {
        promises.push(runWorker({ number: i }));
    }

    try {
        const results = await Promise.all(promises);
        console.log('Results from all workers:', results);
    } catch (err) {
        console.error(err);
    }
}

runMultipleWorkers();
