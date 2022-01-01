<script>
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

export default {
  data () {
    return {
      selected: 'priority',
      radios: {
        priority: 'Prioritários',
        older: 'Mais antigos',
        newer: 'Mais recentes',
        production_date: 'Data de entrega',
        pre_register: 'Pré-registro'
      },
      icons: {
        faExclamationCircle
      }
    }
  },
  computed: {
    messagesOfFilters () {
      return {
        priority: '<strong>Ordem de cadastro mais antigo primeiro</strong>, apenas pedidos em aberto',
        older: '<strong>Ordem de cadastro mais antigos primeiros</strong>, incluindo pedidos fechados',
        newer: '<strong>Ordem de cadastro mais recente primeiros</strong>, incluindo pedidos fechados',
        production_date: `
          <strong>Ordem de data de entrega mais antiga primeiro</strong>, apenas pedidos em aberto
          <br/>(pedidos sem data de entrega informada ficam por último).
        `,
        pre_register: '<strong>Pedidos que precisam ter seus dados completados.</strong>'
      }
    }
  },
  methods: {
    onOptionChange () {
      this.$emit('filter-changed', this.selected)
    }
  }
}
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div>
    <div
      class="btn-group mb-1"
      role="group"
      aria-label="Filtro geral de pedidos"
    >
      <template v-for="name, key in radios">
        <input
          :id="`${key}__sort`"
          :key="key + '__input'"
          v-model="selected"
          type="radio"
          class="btn-check"
          :name="`${key}__sort`"
          :value="key"
          autocomplete="off"
          @change="onOptionChange"
        >
        <label
          :key="key + 'Label'"
          class="btn btn-outline-primary"
          :class="selected === key && 'fw-bold'"
          :for="`${key}__sort`"
        >{{ name }}</label>
      </template>
    </div>

    <div
      class="text-secondary small"
      :class="selected === 'pre_register' && 'text-danger'"
    >
      <FontAwesomeIcon
        class="me-1"
        fixed-width
        :icon="icons.faExclamationCircle"
      />
      <span v-html="messagesOfFilters[selected]" />
    </div>
  </div>
</template>
