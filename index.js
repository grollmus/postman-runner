const cliParser = require('./utils/cli-parser.js');
const path = require('path');
const async = require('async');
const newman = require('newman');

const args = cliParser.getCliArguments();

const { runCount = 10, collection } = args;

let validator = {
  set: function (obj, prop, value) {
    if (prop === 'runCount') {
      value = Number.parseInt(value);
      if (!Number.isInteger(value)) {
        throw new TypeError('The runCount is not an integer!');
      }
      if (value <= 0) {
        throw new Error('Provided runCount is less or equal than 0!');
      }
    }

    if (prop === 'collection') {
      if (!value) throw new Error('No path to collection provided! Use --collection');
    }

    obj[prop] = value;
    return true;
  },
};

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
