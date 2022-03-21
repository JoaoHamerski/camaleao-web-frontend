<script>
import { faCalendarAlt, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { DateTime } from 'luxon'

export default {
  data () {
    return {
      week: '',
      icons: {
        faCalendarAlt,
        faSyncAlt
      }
    }
  },
  methods: {
    getInputDate (input) {
      if (input === null) {
        return DateTime.now().toFormat('dd/MM/y')
      }

      if (input === '') {
        return null
      }

      return input.split('-')[0]
    },
    onWeekSelected (input) {
      const date = this.getInputDate(input)

      if (!date) {
        return
      }

      this.$emit('week-selected', date)
    },
    onRefreshClick () {
      this.$emit('refresh')
    }
  }
}
</script>

<template>
  <div class="card">
    <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
      <div>
        <h5 class="fw-bold mb-0">
          <FontAwesomeIcon
            :icon="icons.faCalendarAlt"
            fixed-width
          />
          Produção semanal
        </h5>
        <div class="small">
          Pedidos com data de produção pela semana
        </div>
      </div>
      <div class="d-flex">
        <AppInput
          id="week"
          v-model="week"
          input-class="border-0"
          name="week"
          type="week"
          placeholder="Selecione uma semana..."
          :default-margin="false"
          @input="onWeekSelected"
        />

        <AppButton
          btn-class="border-0 text-primary"
          :icon="icons.faSyncAlt"
          color="light"
          class="ms-2"
          tooltip="Atualizar"
          @click.prevent="onRefreshClick"
        />
      </div>
    </div>
  </div>
</template>
