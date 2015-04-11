var {
  docopt
} = require('docopt')
var fs = require('fs')
var Service = require('node-mac').Service
var expandHomeDir = require('expand-home-dir')
var Logdown = require('logdown')
var cons = new Logdown({
  prefix: ''
})
var path = require('path');


var getOptions = doc => {
  "use strict"
  var o = docopt(doc)
  var help = o['--help'] || false
  var restart = o.restart
  var stop = o.stop
  var start = o.start
  var remove = o.remove
  var install = o.install
  var info = o.info
  var prepare = o.prepare
  var dir = o['--directory'] || '~/Pictures/Unsplash'
  var time = o['--time'] || 10
  return {
    help, dir, time, remove, install, prepare, restart, stop, start, info
  }
}

var doc = fs.readFileSync(path.join(__dirname, "/docs/usage.md"), 'utf8')

var main = () => {
  "use strict"
  var {
    dir, time, remove, install, prepare, start, stop, restart, info
  } = (getOptions(doc))

  var svc = new Service({
    name: "Unsplash Updater",
    description: "Update your desktop image from Unsplash",
    script: `${__dirname}/lib/update.js`,
    env: [{
      name: "HOME",
      value: expandHomeDir("~")
    }, {
      name: "PATH",
      value: process.env.PATH
    }, {
      name: 'UNSPLASH_DIR',
      value: expandHomeDir(dir)
    }, {
      name: 'UNSPLASH_TIME',
      value: time
    }]
  })

  svc.on('install', () => {
    cons.log("Unsplash updater installed");
  })

  svc.on('uninstall', () => {
    cons.log("Unsplash updater stopped");
  })

  if (install) {
    cons.log("Installing service");
    svc.install()
  }

  if (start) {
    cons.log("Starting service");
    svc.start()
  }

  if (stop) {
    cons.log("Stopping service");
    svc.stop()
  }

  if (restart) {
    cons.log("Restarting service");
    svc.restart()
  }

  if (info) {
    if (svc.exists) {
      cons.log(`Process '${svc.name}' runs with id '${svc.id}'`)
    } else {
      cons.log("The process does not exist.")
    }
  }

  if (remove) {
    cons.log("Removing service");
    svc.uninstall()
  }

  if (prepare) {
    cons.log("")
    cons.log("To prepare the image database, execute this command:");
    console.log(`${__dirname}/node_modules/.bin/unsplash update`)
  }
}

main()