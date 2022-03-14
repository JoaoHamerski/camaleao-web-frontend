<script>
import { faListAlt } from '@fortawesome/free-solid-svg-icons'
import ActivityItem from './ActivityItem'

export default {
  components: {
    ActivityItem
  },
  props: {
    activities: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      icons: {
        faListAlt
      }
    }
  }
}
</script>

<template>
  <AppCard>
    <template #header>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          :icon="icons.faListAlt"
          fixed-width
        />
        Atividades do sistema
      </h6>
    </template>

    <template #body>
      <ul class="list-group list-group-flush">
        <ActivityItem
          v-for="activity in activities"
          :key="activity.id"
          :item="activity"
        />
      </ul>
    </template>
  </AppCard>
</template>
