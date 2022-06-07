<script>
import { faReceipt, faSearch } from '@fortawesome/free-solid-svg-icons'
import { GetDailyCashDetailedFlow } from '@/graphql/DailyCash.gql'
import DailyCashDetailedFlowItems from './DailyCashDetailedFlowItems.vue'

export default {
  components: {
    DailyCashDetailedFlowItems
  },
  apollo: {
    dailyCashDetailedFlow () {
      return {
        query: GetDailyCashDetailedFlow,
        variables () {
          return {
            page: this.page,
            date: this.date
          }
        },
        skip: true
      }
    }
  },
  data () {
    return {
      collapse: false,
      page: 1,
      date: '',
      icons: {
        faReceipt,
        faSearch
      }
    }
  },
  computed: {
    isQueryLoading () {
      return !!this.$apollo.queries.dailyCashDetailedFlow.loading
    }
  },
  methods: {
    onInputCollapse(value) {
      if (value) {
        this.$apollo.queries.dailyCashDetailedFlow.skip = false
      }
    },
    paginate (to) {
      if (to === 'next') {
        this.page--
        return
      }

      if (to === 'previous') {
        this.page++
        return
      }
    }
  }
}
</script>

<template>
  <AppContainer
    v-model="collapse"
    collapsible
    @input="onInputCollapse"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faReceipt"
        fixed-width
      />
      Fluxo detalhado
    </template>

    <template #body>
      <div class="position-relative">
        <AppLoading v-show="isQueryLoading" />
        <div class="d-flex justify-content-between">
          <div class="mb-3">
            <div class="btn-group">
              <button
                class="btn btn-outline-primary"
                :class="date !== '' && 'disabled'"
                @click="paginate('previous')"
              >
                Anterior
              </button>
              <button
                class="btn btn-outline-primary"
                :class="(page === 1 || date !== '') && 'disabled'"
                @click="paginate('next')"
              >
                Próximo
              </button>
            </div>
          </div>
          <div>
            <AppInput
              id="month"
              v-model="date"
              name="month"
              type="month"
              placeholder="mm/aaaa"
            >
              Mês específico:
            </AppInput>
          </div>
        </div>
        <DailyCashDetailedFlowItems
          v-for="item in dailyCashDetailedFlow"
          :key="item.date"
          :item="item"
          class="mb-3"
          @open-pendency-orders="$emit('open-pendency-orders', $event)"
        />
      </div>
    </template>
  </AppContainer>
</template>
