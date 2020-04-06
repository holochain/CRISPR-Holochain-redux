import { fieldNames } from './fieldNames.js'
import { hApps } from './hApps.js'
import { validationRules } from './validationRules.js'
export default {
  namespaced: true,
  state: {
    developer: {
      folder: '/Users/philipbeadle/holochain/culture'
    },
    hApps: hApps,
    validationRules: validationRules,
    fieldNames: fieldNames
  }
}
