import Errors from './Errors'
import { cloneDeep, set, get } from 'lodash-es'

class Form {
  constructor (data) {
    this.originalData = data
    this.originalStructure = cloneDeep(data)
    this.errors = new Errors()
    this.fields = []

    for (const field in data) {
      this[field] = data[field]
    }
  }

  reset () {
    for (const field in this.originalStructure) {
      this[field] = this.originalStructure[field]
    }

    this.errors.clear('*')
  }

  set(values) {
    for (const prop in values) {
      set(this, prop, get(values, prop))
    }
  }

  data () {
    const data = {}

    for (const property in this.originalData) {
      data[property] = this[property]
    }

    return data
  }

  onFail (error) {
    this.errors.record(error)
  }
}

export default Form
