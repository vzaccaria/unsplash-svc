#!/usr/bin/env node
"use strict";

var _require = require("docopt");

var docopt = _require.docopt;

var fs = require("fs");
var Service = require("node-mac").Service;
var expandHomeDir = require("expand-home-dir");
var Logdown = require("logdown");
var cons = new Logdown({
  prefix: ""
});
var path = require("path");

var getOptions = function (doc) {
  "use strict";
  var o = docopt(doc);
  var help = o["--help"] || false;
  var restart = o.restart;
  var stop = o.stop;
  var start = o.start;
  var remove = o.remove;
  var install = o.install;
  var info = o.info;
  var prepare = o.prepare;
  var dir = o["--directory"] || "~/Pictures/Unsplash";
  var time = o["--time"] || 10;
  return {
    help: help, dir: dir, time: time, remove: remove, install: install, prepare: prepare, restart: restart, stop: stop, start: start, info: info
  };
};

var doc = fs.readFileSync(path.join(__dirname, "/docs/usage.md"), "utf8");

var main = function () {
  "use strict";

  var _getOptions = getOptions(doc);

  var dir = _getOptions.dir;
  var time = _getOptions.time;
  var remove = _getOptions.remove;
  var install = _getOptions.install;
  var prepare = _getOptions.prepare;
  var start = _getOptions.start;
  var stop = _getOptions.stop;
  var restart = _getOptions.restart;
  var info = _getOptions.info;

  var svc = new Service({
    name: "Unsplash Updater",
    description: "Update your desktop image from Unsplash",
    script: "" + __dirname + "/lib/update.js",
    env: [{
      name: "HOME",
      value: expandHomeDir("~")
    }, {
      name: "PATH",
      value: process.env.PATH
    }, {
      name: "UNSPLASH_DIR",
      value: expandHomeDir(dir)
    }, {
      name: "UNSPLASH_TIME",
      value: time
    }]
  });

  svc.on("install", function () {
    cons.log("Unsplash updater installed");
  });

  svc.on("uninstall", function () {
    cons.log("Unsplash updater stopped");
  });

  if (install) {
    cons.log("Installing service");
    svc.install();
  }

  if (start) {
    cons.log("Starting service");
    svc.start();
  }

  if (stop) {
    cons.log("Stopping service");
    svc.stop();
  }

  if (restart) {
    cons.log("Restarting service");
    svc.restart();
  }

  if (info) {
    if (svc.exists) {
      cons.log("Process '" + svc.name + "' runs with id '" + svc.id + "'");
    } else {
      cons.log("The process does not exist.");
    }
  }

  if (remove) {
    cons.log("Removing service");
    svc.uninstall();
  }

  if (prepare) {
    cons.log("");
    cons.log("To prepare the image database, execute this command:");
    console.log("" + __dirname + "/node_modules/.bin/unsplash update");
  }
};

main();
