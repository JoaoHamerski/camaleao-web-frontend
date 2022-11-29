<script>
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    fileEntry: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      hideDuplicates: false,
      icons: {
        faExclamationCircle
      },
    }
  },
  computed: {
    entriesCount () {
      return this.fileEntry.entries.length
    },
    duplicatesCount () {
      return this
        .fileEntry
        .entries
        .filter(entry => entry.isDuplicated)
        .length
    },
  },
  watch: {
    fileEntry () {
      this.hideDuplicates = false
    }
  },
  methods: {
    onHideDuplicatesClick () {
      this.$emit('hide-duplicates', !this.hideDuplicates)
    },
  }
}
</script>

<template>
  <div>
    <span class="badge bg-primary mb-2">
      {{ entriesCount }} entradas carregadas
    </span>

    <span
      v-tippy
      content="Já constam no banco de dados"
      class="badge bg-secondary ms-1 mb-2"
    >
      {{ duplicatesCount }} entradas duplicadas
    </span>

    <AppCheckboxSwitch
      id="hideDuplicatesCheckbox"
      v-model="hideDuplicates"
      @input="onHideDuplicatesClick"
    >
      Ocultar duplicatas
    </AppCheckboxSwitch>

    <div
      class="small text-secondary"
    >
      <span
        v-tippy
        content="Significa que ela já consta no banco de dados de Pagamentos ou Despesas do sistema."
      >
        <FontAwesomeIcon
          :icon="icons.faExclamationCircle"
          fixed-width
        />
        Entradas duplicadas ou canceladas são marcadas em cinza.
      </span>
      <div>
        <FontAwesomeIcon
          :icon="icons.faExclamationCircle"
          fixed-width
        />
        Entradas canceladas são riscadas.
      </div>
    </div>
  </div>
</template>
