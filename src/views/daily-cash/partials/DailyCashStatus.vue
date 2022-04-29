<script>
import roles from '@/constants/roles'

const DailyCashStatusConfirmation = () => import('./DailyCashStatusConfirmation.vue')
const DailyCashStatusInfo = () => import('./DailyCashStatusInfo.vue')

export default {
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      roles
    }
  },
  computed: {
    getComponent () {
      if (this.$helpers.canView(roles.GERENCIA) && this.entry.is_confirmed === null) {
        return DailyCashStatusConfirmation
      }

      return DailyCashStatusInfo
    }
  }
}
</script>
<template>
  <Component
    :is="getComponent"
    :entry="entry"
  />
</template>
