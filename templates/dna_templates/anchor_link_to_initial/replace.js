var fs = require('fs')
var path = require('path')
var templateC = 'Note'
var template = 'note'
var zome = process.argv[2].toLowerCase()
var zomeC = zome.charAt(0).toUpperCase() + zome.substring(1)

function replace(fileName, template, zome) {
  var templateFile = fs.readFileSync(path.resolve(__dirname, fileName)).toString()
  newContent = templateFile.replace(new RegExp(template, 'g'), zome)
  fs.writeFileSync(path.resolve(__dirname, fileName), newContent)
}

replace('zomes/'  + zome + 's/zome.json', template, zome)
replace('zomes/'  + zome + 's/code/.hcbuild', template, zome)
replace('zomes/'  + zome + 's/code/cargo.toml', template, zome)
replace('zomes/'  + zome + 's/code/src/lib.rs', templateC, zomeC)
replace('zomes/'  + zome + 's/code/src/lib.rs', template, zome)
fs.renameSync(path.resolve(__dirname, 'zomes/'  + zome + 's/code/src/' + template), path.resolve(__dirname, 'zomes/'  + zome + 's/code/src/' + zome))
replace('zomes/'  + zome + 's/code/src/'  + zome + '/mod.rs', templateC, zomeC)
replace('zomes/'  + zome + 's/code/src/'  + zome + '/mod.rs', template, zome)
replace('zomes/'  + zome + 's/code/src/'  + zome + '/mod.rs', template.toUpperCase(), zome.toUpperCase())
replace('zomes/'  + zome + 's/code/src/'  + zome + '/handlers.rs', templateC, zomeC)
replace('zomes/'  + zome + 's/code/src/'  + zome + '/handlers.rs', template, zome)
replace('zomes/'  + zome + 's/code/src/'  + zome + '/handlers.rs', template.toUpperCase(), zome.toUpperCase())
replace('zomes/'  + zome + 's/code/src/'  + zome + '/validation.rs', templateC, zomeC)
replace('zomes/'  + zome + 's/code/src/'  + zome + '/validation.rs', template, zome)
replace('zomes/'  + zome + 's/code/src/'  + zome + '/validation.rs', template.toUpperCase(), zome.toUpperCase())
replace('test/'  + zome + 's/index.js', template, zome)
