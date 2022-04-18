<script>
import { GetStatus } from '@/graphql/Status.gql'

import TheStatusCard from './TheStatusCard.vue'
import TheStatusHeader from './TheStatusHeader.vue'

export default {
  metaInfo: {
    title: 'Status'
  },
  apollo: {
    status: {
      query: GetStatus
    }
  },
  components: {
    TheStatusCard,
    TheStatusHeader
  },
  data () {
    return {
      status: []
    }
  },
  computed: {
    isLoading () {
      return !!this.$apollo.queries.status.loading
    }
  }
}
</script>
<template>
  <div class="py-5">
    <TheStatusHeader :status-list="status" />
    <TheStatusCard
      :status="status"
      :is-loading="isLoading"
    />
  </div>
</template>
