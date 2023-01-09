#!/usr/bin/env node

(function run() {
  const cliParser = require('./utils/cli-parser.js');
  const path = require('path');
  const async = require('async');
  const newman = require('newman');
  const chalk = require('chalk');

  const cliArguments = cliParser.getCliArguments();
  if (!cliArguments) return;

  const { runCount, collection, insecure } = cliArguments;

  const parametersForTestRun = {
    collection: collection,
    reporters: 'cli',
    insecure,
  };

  const parallelCollectionRun = function (done) {
    newman.run(parametersForTestRun, done);
  };

  let commands = Array(runCount).fill(parallelCollectionRun);

  async.parallel(commands, (err, results) => {
    err && console.error(chalk.bold.bgRed(err));

    results.forEach((result) => {
      var failures = result.run.failures;
      console.info(chalk.bold.bgGreenBright(failures.length ? JSON.stringify(failures.failures, null, 2) : `${result.collection.name} ran successfully.`));
    });
  });
})();
