<script>

import { map, upperFirst } from 'lodash-es'
import { formatDatetime, formatCurrencyBRL, formatPhone } from '@/utils/formatters'

import ActivityItemChanges from './ActivityItemChanges'
import ActivityItemText from './ActivityItemText'

export default {
  components: {
    ActivityItemChanges,
    ActivityItemText
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isConfig () {
      return this.item.log_name.startsWith('configs')
    },
    renderPropChanges () {
      return this.description.type === 'updated'
        && !this.isConfig
    },
    properties () {
      const filename = this.item.log_name

      return require(`../properties/${filename}.map.json`)
    },
    description () {
      return JSON.parse(this.item.description)
    },
    attributes () {
      const properties = JSON.parse(this.item.properties)

      return properties?.attributes || {}
    },
    text () {
      const { placeholderText, causerProps, subjectProps, attributesProps } = this.description

      const causerReplacedText = this.$helpers.replaceStrArray(
        ':causer',
        this.getValuesToReplace(causerProps, true),
        placeholderText
      )

      const subjectReplacedText = this.$helpers.replaceStrArray(
        ':subject',
        this.getValuesToReplace(subjectProps, false),
        causerReplacedText
      )

      const text = this.$helpers.replaceStrArray(
        ':attribute',
        this.getValuesToReplace(attributesProps, false),
        subjectReplacedText
      )

      return text
    }
  },
  methods: {
    formatDatetime,
    formatCurrencyBRL,
    formatPhone,
    getFormattedHref (url, text) {
      return `<a class="text-decoration-none" href="${url}" target="_blank">${text}</a>`
    },
    getOrderUrl (value) {
      if (this.item.subject) {
        const { id, client } = this.item.subject
        const url = this.$helpers.getUrl(
          'orders.show',
          { client: client.id, order: id }
        )

        return this.getFormattedHref(url, value)
      }

      return value
    },
    getClientUrl (value) {
      if (this.item.subject) {
        const id = this.item.subject?.client?.id || this.item.subject.id
        const url = this.$helpers.getUrl(
          'clients.show',
          { client: id }
        )

        return this.getFormattedHref(url, value)
      }

      return value
    },
    getFormattedValue (key, value) {
      const property = this.properties[key]

      if (property === undefined) {
        return value
      }

      if (property.format) {
        const method = 'format' + upperFirst(property.format)

        return this[method](value)
      }

      if (property.link) {
        return this[property.method](value)
      }

      return value
    },
    getValuesToReplace (props, isCauser) {
      return map(props, (value, prop) => {
        if (isCauser && this.item.causer) {
          return `<span class="fw-bold">${this.item.causer[prop]}</span>`
        }

        if (isCauser && !this.item.causer) {
          return '<span class="fw-bold">[Não identificável]</span>'
        }

        if (!isCauser) {
          return `<span class="fw-bold">${this.getFormattedValue(prop, value)}</span>`
        }

        return '-'
      })
    }
  }
}
</script>

<template>
  <li class="list-group-item">
    <ActivityItemText
      v-bind="{item, text, description, attributes}"
    />

    <ActivityItemChanges
      v-if="renderPropChanges"
      :item="item"
      :props-map="properties"
    />
  </li>
</template>
