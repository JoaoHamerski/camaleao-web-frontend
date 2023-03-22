<script>
import {
  faSyncAlt,
  faTshirt,
  faCut,
  faTruck
} from '@fortawesome/free-solid-svg-icons'
import { DateTime } from 'luxon'
import { FIELD_TYPES } from './WeeklyCalendar.vue'

export default {
  props: {
    field: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      FIELD_TYPES,
      week: '',
      icons: {
        faSyncAlt
      }
    }
  },
  computed: {
    getIconByFieldType () {
      if (this.field === 'PRINT_DATE') {
        return faTshirt
      }

      if (this.field === 'SEAM_DATE') {
        return faCut
      }

      return faTruck
    },
    fieldTypeLabel () {
      return FIELD_TYPES[this.field]
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
    <div class="card-header bg-primary text-white d-flex flex-column flex-sm-row justify-content-between align-items-sm-center">
      <div class="mb-3 mb-sm-0">
        <h5 class="fw-bold mb-0">
          <FontAwesomeIcon
            :icon="getIconByFieldType"
            fixed-width
          />
          Calendário de {{ fieldTypeLabel }}
        </h5>
        <div class="small">
          Pedidos com
          <span class="fw-bold">
            data de <span class="text-lowercase">{{ FIELD_TYPES[field] }}</span>
          </span>
          pela semana
        </div>
      </div>
      <div class="d-flex">
        <AppInput
          id="week"
          v-model="week"
          class="flex-grow-1"
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

<style lang="scss" scoped>
@import "@/sass/bootstrap-utilities";

@include media-breakpoint-down (sm) {
  .card {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
