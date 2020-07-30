var fs = require('fs')
var array = fs.readFileSync('conductor-output.txt').toString().split("\n")
let playerIndex = 0
for(i in array) {
  if (array[i].includes('Using config path')) {
    playerIndex++
    let conductorPath = array[i].split(": ")
    fs.copyFileSync(conductorPath[1], playerIndex + '-conductor-config.toml')
    var config = fs.readFileSync(playerIndex + '-conductor-config.toml').toString().replace('tryorama-interface', 'developer-interface').replace('port = 3300', 'port = 4300')
    fs.writeFileSync(playerIndex + '-conductor-config.toml', config)
    console.log(playerIndex + '-conductor-config.toml copied to project root')
  }
}
fs.unlinkSync('conductor-output.txt')
