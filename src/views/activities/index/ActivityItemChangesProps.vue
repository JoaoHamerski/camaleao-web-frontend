<script>
import { upperFirst } from 'lodash-es'
import {
  formatDatetime,
  formatCurrencyBRL,
  formatPhone
} from '@/utils/formatters'

export default {
  props: {
    propsOld: {
      type: Object,
      required: true
    },
    propsUpdated: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    }
  },
  computed: {
    propsKeys () {
      return Object.keys(this.propsOld)
    },
    mapKeys () {
      return Object.keys(this.map)
    }
  },
  methods: {
    formatDatetime,
    formatCurrencyBRL,
    formatPhone,
    getFormattedKey (key) {
      const item = this.map[key]

      return item.text
    },
    handleBoolean (value, handle) {
      return handle[value !== null ? !!value : null]
    },
    handleList (value) {
      if (!value.length) {
        return 'N/A'
      }

      const items = value.map(item => `<li class="list-group-item">${item}</li>`)

      return `<ul class="list-group list-group-sm">${items.join('')}</ul>`
    },
    handleType (value, property) {
      if (property.type === 'boolean') {
        return this.handleBoolean(value, property.handle)
      }

      if (property.type === 'list') {
        return this.handleList(value)
      }
    },
    getFormattedProp (value, key) {
      const property = this.map[key]

      if (property.type) {
        return this.handleType(value, property)
      }

      if (!value) {
        return 'N/A'
      }

      if (property.format) {
        const method = 'format' + upperFirst(property.format)

        return this[method](value)
      }

      return value
    }
  }
}
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="table-responsive">
    <table class="table table-sm">
      <thead>
        <tr>
          <th />
          <th>DE</th>
          <th>PARA</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="key in mapKeys">
          <tr
            v-if="propsKeys.includes(key)"
            :key="key"
          >
            <td class="fw-bold w-25">
              {{ getFormattedKey(key) }}
            </td>
            <td v-html="getFormattedProp(propsOld[key], key)" />
            <td v-html="getFormattedProp(propsUpdated[key], key)" />
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
