import Vue from 'vue'
import * as path from 'path'
const requireComponent = require.context('@/components/parts', true, /\.vue$/)
requireComponent.keys().forEach(fileName => {
  const componentName = path.basename(fileName).replace('.vue', '')
  const componentConfig = requireComponent(fileName)
  // console.log(componentName)
  Vue.component(componentName, componentConfig.default || componentConfig)
})
