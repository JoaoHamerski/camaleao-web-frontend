import Errors from './Errors'
import { cloneDeep } from 'lodash-es'

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
