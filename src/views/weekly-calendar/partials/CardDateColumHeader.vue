<script>
import { faTshirt } from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'
import { DateTime } from 'luxon'

export default {
  props: {
    active: {
      type: Boolean,
      required: true
    },
    date: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      icons: {
        faTshirt
      }
    }
  },
  computed: {
    isDateToday () {
      return this.date.date === DateTime.now().toISODate()
    },
    cardHeaderClasses () {
      const hasBgClickable = !this.$isMobile
      const classMiddleFix = hasBgClickable ? '-link-' : '-'
      return [
        this.isDateToday ? `bg${classMiddleFix}success` : `bg${classMiddleFix}primary`,
        !this.$isMobile && 'clickable'
      ]
    }
  },
  methods: {
    formatDate (date) {
      if (this.active) {
        return formatDatetime(date, 'dd/MM - EEEE')
      }

      return formatDatetime(date, 'dd/MM - EEE')
    },
    onCardHeaderClick (event) {
      if (this.$isMobile) {
        event.preventDefault()
      }

      this.$emit('header-clicked', {
        date: this.date.date,
        active: !this.active
      })
    }
  }
}
</script>

<template>
  <div
    class="card-header text-white text-center py-1"
    :class="cardHeaderClasses"
    @click.prevent="onCardHeaderClick"
  >
    <div class="text-uppercase fw-bold">
      {{ formatDate(date.date) }}
    </div>
    <div class="small">
      <FontAwesomeIcon
        :icon="icons.faTshirt"
        fixed-width
      />
      {{
        !date.total_quantity
          ? 'Nenhuma peça'
          : `${date.total_quantity} peças`
      }}
    </div>
  </div>
</template>
