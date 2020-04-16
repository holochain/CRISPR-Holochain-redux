var fs = require('fs')
var array = fs.readFileSync('conductor-output.txt').toString().split("\n")
let playerIndex = 0
for(i in array) {
  if (array[i].includes('Using config path')) {
    playerIndex++
    let conductorPath = array[i].split(": ")
    fs.copyFileSync(conductorPath[1], '../' + playerIndex + '-conductor-config.toml')
    console.log(playerIndex + '-conductor-config.toml copied to project root')
  }
}
fs.unlinkSync('conductor-output.txt')
