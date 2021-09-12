import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { upperFirst, camelCase } from 'lodash-es'

Vue.component('FontAwesomeIcon', FontAwesomeIcon)

// Auto register globally every base component: "App*.vue"
const requireComponent = require.context(
  '../components',
  true,
  /App[A-z]\w+\.(vue)$/
)

for (const fileName of requireComponent.keys()) {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )
}
