<script>
import { map, filter, isEmpty } from 'lodash-es'
import { activities } from '@/graphql/Activity.gql'
import TheActivitiesCard from './TheActivitiesCard'
import TheActivitiesFilter from '../partals/TheActivitiesFilter'
import { DateTime } from 'luxon'

const QUERY_FILTER_MAP = [
  {
    prop: 'causer_id',
    column: 'CAUSER_ID',
    operator: 'EQ'
  },
  {
    prop: 'subject_type',
    column: 'SUBJECT_TYPE',
    operator: 'EQ'
  },
  {
    prop: 'date',
    column: 'CREATED_AT',
    operator: 'EQ'
  }
]

export default {
  components: {
    TheActivitiesCard,
    TheActivitiesFilter
  },
  metaInfo: {
    title () {
      return 'Atividades do sistema'
    }
  },
  apollo: {
    activities: {
      query: activities,
      variables () {
        return {
          first: 10,
          page: this.page,
          orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
          where: this.where
        }
      },
      fetchPolicy: 'cache-and-network',
      deep: true
    }
  },
  data () {
    return {
      page: 1,
      where: {},
      activities: {
        data: [],
        paginatorInfo: {}
      }
    }
  },
  computed: {
    isLoading () {
      return !!this.$apollo.queries.activities.loading
    }
  },
  methods: {
    getValueFromParam (params, prop) {
      if (prop === 'subject_type') {
        return `App\\Models\\${params[prop]}`
      }

      if (prop === 'date') {
        const date = DateTime.fromFormat(params[prop], 'dd/MM/y')

        return date.toSQL()
      }

      return params[prop]
    },
    getAllFilterQueries (queries, params) {
      return map(queries, ({ prop, column, operator }) => {
        return {
          column,
          operator,
          value: this.getValueFromParam(params, prop)
        }
      })
    },
    onFilter (params) {
      const queriesFilled = filter(
        QUERY_FILTER_MAP,
        (item) => !isEmpty(params[item.prop])
      )

      this.page = 1

      if (isEmpty(queriesFilled)) {
        this.where = {}
        return
      }

      this.where = { AND: this.getAllFilterQueries(queriesFilled, params) }
    },
    clearFilter () {
      this.page = 1
      this.where = {}
    }
  }
}
</script>

<template>
  <div class="col col-sm-10 mx-auto py-5">
    <TheActivitiesFilter
      class="mb-2"
      :is-loading="isLoading"
      @filtered="onFilter"
      @clear="clearFilter"
    />

    <TheActivitiesCard
      :activities="activities.data"
      :is-loading="isLoading"
    />

    <AppPaginator
      v-model="page"
      class="mt-2"
      :pagination="activities.paginatorInfo"
      :loading="isLoading"
    />
  </div>
</template>
