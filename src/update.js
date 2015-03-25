var promise = require('bluebird')
var shelljs = require('shelljs')
var _ = require('lodash')

/**
 * Executes command and returns a promise
 * @param  {string} cmd command to be executed
 * @return {promise}     promised output
 */
function exec(cmd) {
  "use strict"
  return new promise((resolve, reject) => {
    console.log(cmd);
    shelljs.exec(cmd, {
      async: true,
      silent: true
    }, (code, output) => {
      if (!code) {
        console.log(output)
        resolve(output)
      } else {
        console.log(output)
        reject(output)
      }
    })
  })
}

function interval(ms, cb) {
  "use strict"
  setInterval(cb, ms)
}

function main() {
  "use strict"
  var dir = process.env.UNSPLASH_DIR
  var time = parseInt(process.env.UNSPLASH_TIME)
  if (_.isNaN(time)) {
    console.log(JSON.stringify(process.env, 0, 4));
    time = 10;
  }
  exec(`${__dirname}/../node_modules/.bin/unsplash desktop -r -p ${dir}`)
  console.log(`Updating Unsplash images in ${dir} every ${time} minutes`);
  interval(parseInt(time * 60 * 1000), () => {
    console.log("Updating Unsplash images");
    exec(`rm -f ${dir}/*.jpeg`).then(() => {
      exec(`${__dirname}/../node_modules/.bin/unsplash desktop -r -p ${dir}`)
    })
  })

}

main()