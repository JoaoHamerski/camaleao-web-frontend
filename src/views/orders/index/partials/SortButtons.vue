<script>
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      radios: {
        priority: 'Prioritários',
        older: 'Mais antigos',
        newer: 'Mais recentes',
        delivery_date: 'Data de entrega',
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
        delivery_date: `
          <strong>Ordem de data de entrega mais antiga primeiro</strong>, apenas pedidos em aberto
          <br/>(pedidos sem data de entrega informada ficam por último).
        `,
        pre_register: '<strong>Pedidos que precisam ter seus dados completados.</strong>'
      }
    }
  },
  methods: {
    onOptionChange () {
      this.$emit('filter-changed', this.value)
    }
  }
}
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="table-responsive-sm">
    <div
      class="btn-group mb-1"
      role="group"
      aria-label="Filtro geral de pedidos"
    >
      <template v-for="name, key in radios">
        <input
          :id="`${key}__sort`"
          :key="key + '__input'"
          :value="key"
          :checked="value === key"
          type="radio"
          class="btn-check"
          name="sort_buttons"
          autocomplete="off"
          @input="$emit('input', $event.target.value)"
          @change="onOptionChange"
        >
        <label
          :key="key + '__label'"
          class="btn btn-outline-primary text-nowrap"
          :class="value === key && 'fw-bold'"
          :for="`${key}__sort`"
        >
          {{ name }}
        </label>
      </template>
    </div>

    <div
      v-show="value !== ''"
      class="text-secondary small mb-2 mb-sm-0"
      :class="(value === 'pre_register') && 'text-danger'"
    >
      <FontAwesomeIcon
        class="me-1"
        fixed-width
        :icon="icons.faExclamationCircle"
      />
      <span v-html="messagesOfFilters[value]" />
    </div>
  </div>
</template>
