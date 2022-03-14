<script>
import { activities } from '@/graphql/Activity.gql'
import TheActivitiesCard from './TheActivitiesCard'

export default {
  components: {
    TheActivitiesCard
  },
  metaInfo: {
    title () {
      return 'Atividades do sistema'
    }
  },
  apollo: {
    activities: {
      query: activities,
      variables: {
        first: 10
      }
    }
  },
  data () {
    return {
      activities: {
        data: [],
        paginatorInfo: {}
      }
    }
  }
}
</script>

<template>
  <div class="col-9 mx-auto">
    <TheActivitiesCard :activities="activities.data" />
  </div>
</template>
