import { fieldNames } from './fieldNames.js'
import { validationRules } from './validationRules.js'
export default {
  namespaced: true,
  state: {
    developer: {
      folder: '/Users/philipbeadle/holochain/Holochain-IDE'
    },
    validationRules: validationRules,
    fieldNames: fieldNames
  }
}
