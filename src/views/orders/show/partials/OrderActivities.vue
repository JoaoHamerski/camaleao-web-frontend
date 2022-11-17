<script>
import ActivityItem from '@/views/activities/index/ActivityItem.vue'
import { GetOrderActivities } from '@/graphql/Order.gql'
import { faListAlt } from '@fortawesome/free-solid-svg-icons'

export default {
  apollo: {
    ordersActivities: {
      query: GetOrderActivities,
      variables () {
        return {
          id: this.order.id
        }
      },
      skip () {
        return !this.value
      },
      fetchPolicy: 'network-only'
    }
  },
  components: {
    ActivityItem
  },
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      ordersActivities: [],
      value: false,
      icons: {
        faListAlt
      }
    }
  },
  computed: {
    isQueryLoading () {
      return !!this.$apollo.queries.ordersActivities.loading
    }
  }
}
</script>

<template>
  <AppContainer
    v-model="value"
    collapsible
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faListAlt"
        fixed-width
      />
      Atividades
    </template>
    <template #body>
      <AppLoading
        v-show="isQueryLoading"
      />
      <div
        v-if="!ordersActivities.length"
        class="text-center text-secondary small my-4"
      >
        Nenhuma atividade encontrada
      </div>
      <div v-else>
        <template v-for="activity in ordersActivities ">
          <ActivityItem
            :key="activity.id"
            :item="activity"
          />
        </template>
      </div>
    </template>
  </AppContainer>
</template>
