const cliParser = require('./utils/cli-parser.js');
const path = require('path');
const async = require('async');
const newman = require('newman');

const { runCount, collection } = cliParser.getCliArguments();

const parametersForTestRun = {
  collection: path.join(__dirname, collection),
  reporters: 'cli',
};

const parallelCollectionRun = function (done) {
  newman.run(parametersForTestRun, done);
};

let commands = Array(runCount).fill(parallelCollectionRun);

async.parallel(commands, (err, results) => {
  err && console.error(err);

  results.forEach((result) => {
    var failures = result.run.failures;
    console.info(failures.length ? JSON.stringify(failures.failures, null, 2) : `${result.collection.name} ran successfully.`);
  });
});
