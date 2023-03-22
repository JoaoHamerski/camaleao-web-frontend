import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { upperFirst, camelCase } from 'lodash-es'

Vue.component('FontAwesomeIcon', FontAwesomeIcon)

const components = import.meta.glob(
  './**/App*.(jsx|vue)', 
  { eager: true }
)

Object.entries(components).forEach(([path, definition]) => {
  // Get name of component, based on filename
  const componentName = path
    .split('/')
    .pop()
    .replace(/\.\w+$/, '')
  
  // Register component on this Vue instance
  Vue.component(componentName, definition.default)
})