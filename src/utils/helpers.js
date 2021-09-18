import { isNil } from 'lodash-es'

const fallback = (object, prop, fallbackString = 'N/A') => {
  return isNil(object) ? fallbackString : object[prop]
}

export default {
  fallback
}
