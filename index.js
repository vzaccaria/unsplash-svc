#!/usr/bin/env node
"use strict";

var _require = require("docopt");

var docopt = _require.docopt;

var fs = require("fs");
var Service = require("node-mac").Service;
var expandHomeDir = require("expand-home-dir");
var cons = new require("logdown")({
  prefix: ""
});

var getOptions = function (doc) {
  "use strict";
  var o = docopt(doc);
  var help = o["--help"] || false;
  var remove = o.remove || o.stop;
  var install = o.install || o.start;
  var prepare = o.prepare;
  var dir = o["--directory"] || "~/Pictures/Unsplash";
  var time = o["--time"] || 10;
  return {
    help: help, dir: dir, time: time, remove: remove, install: install, prepare: prepare
  };
};

var doc = fs.readFileSync(__dirname + "/docs/usage.md", "utf8");

var main = function () {
  "use strict";

  var _getOptions = getOptions(doc);

  var dir = _getOptions.dir;
  var time = _getOptions.time;
  var remove = _getOptions.remove;
  var install = _getOptions.install;
  var prepare = _getOptions.prepare;

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
    svc.start();
  });

  svc.on("uninstall", function () {
    cons.log("Unsplash updater stopped");
  });

  if (install) {
    cons.log("Starting service");
    svc.install();
  }

  if (remove) {
    cons.log("Stopping service");
    svc.uninstall();
  }

  if (prepare) {
    cons.log("");
    cons.log("To prepare the image database, execute this command:");
    console.log("" + __dirname + "/node_modules/.bin/unsplash update");
  }
};

main();
