<script>
import { faListAlt } from '@fortawesome/free-solid-svg-icons'
import ActivityItem from './ActivityItem.vue'
import ActivitiesLegendIcon from '../partials/ActivitiesLegendIcon.vue'

export default {
  components: {
    ActivityItem,
    ActivitiesLegendIcon
  },
  props: {
    activities: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
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
  <AppCard class="position-relative">
    <template #header>
      <div class="d-flex justify-content-between align-items-center">
        <h6 class="fw-bold mb-0">
          <FontAwesomeIcon
            :icon="icons.faListAlt"
            fixed-width
          />
          Atividades do sistema
        </h6>
        <ActivitiesLegendIcon />
      </div>
    </template>

    <template #body>
      <AppLoading v-show="isLoading" />

      <template v-if="activities.length">
        <ul class="list-group list-group-flush">
          <ActivityItem
            v-for="activity in activities"
            :key="activity.id"
            :item="activity"
          />
        </ul>
      </template>
      <template v-else>
        <div class="text-center text-secondary my-5">
          Nenhum registro encontrado
        </div>
      </template>
    </template>
  </AppCard>
</template>
