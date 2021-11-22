import { getCliArguments } from './utils/cli-parser.js';
import path from 'path';
import async from 'async';
import newman from 'newman';

const PARALLEL_RUN_COUNT = 300

const args = getCliArguments();
console.log(args);

// const __dirname = path.dirname(new URL(import.meta.url).pathname);
// const parametersForTestRun = {
//     collection: path.join(__dirname, 'TSTcloud.postman_collection.json'), // your collection
//     reporters: 'cli'
// };

// const parallelCollectionRun = function (done) {
//     newman.run(parametersForTestRun, done);
// };

// let commands = []
// for (let index = 0; index < PARALLEL_RUN_COUNT; index++) {
//     commands.push(parallelCollectionRun);
// }

// // Runs the Postman sample collection thrice, in parallel.
// async.parallel(
//     commands,
//     (err, results) => {
//         err && console.error(err);

//         results.forEach(function (result) {
//             var failures = result.run.failures;
//             console.info(failures.length ? JSON.stringify(failures.failures, null, 2) :
//                 `${result.collection.name} ran successfully.`);
//         });
//     });