const cliParser = require('./utils/cli-parser.js');
const path = require('path');
const async = require('async');
const newman = require('newman');

const args = cliParser.getCliArguments();

const { runCount, collection } = args;

if (!collection) {
  throw new Error('No path to collection provided! Use --collection');
}

const parametersForTestRun = {
  collection: path.join(__dirname, collection), // your collection
  reporters: 'cli',
};

const parallelCollectionRun = function (done) {
  newman.run(parametersForTestRun, done);
};

let commands = [];
for (let index = 0; index < runCount; index++) {
  commands.push(parallelCollectionRun);
}

async.parallel(commands, (err, results) => {
  err && console.error(err);

  results.forEach(function (result) {
    var failures = result.run.failures;
    console.info(failures.length ? JSON.stringify(failures.failures, null, 2) : `${result.collection.name} ran successfully.`);
  });
});
