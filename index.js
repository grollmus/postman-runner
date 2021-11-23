const cliParser = require('./utils/cli-parser.js');
const { validator } = require('./utils/args-validator.js');
const path = require('path');
const async = require('async');
const newman = require('newman');

const args = cliParser.getCliArguments();

const { runCount = 10, collection } = args;

const runnerArgs = new Proxy({}, validator);
runnerArgs.runCount = runCount;
runnerArgs.collection = collection;

const parametersForTestRun = {
  collection: path.join(__dirname, runnerArgs.collection),
  reporters: 'cli',
};

const parallelCollectionRun = function (done) {
  newman.run(parametersForTestRun, done);
};

let commands = Array(runnerArgs.runCount).fill(parallelCollectionRun);

async.parallel(commands, (err, results) => {
  err && console.error(err);

  results.forEach((result) => {
    var failures = result.run.failures;
    console.info(failures.length ? JSON.stringify(failures.failures, null, 2) : `${result.collection.name} ran successfully.`);
  });
});
