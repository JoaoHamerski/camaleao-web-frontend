<script>
import { GetEntriesMonthlyBalance } from '@/graphql/Entry.gql'
import { DateTime } from 'luxon'

export default {
  apollo: {
    entriesMonthlyBalance: {
      query: GetEntriesMonthlyBalance,
      fetchPolicy: 'network-only',
      skip () {
        return !this.collapse
      }
    },
  },
  data () {
    return {
      DateTime,
      entriesMonthlyBalance: null,
      collapse: false
    }
  },
  computed: {
    isQueryLoading () {
      return this.$apollo.queries.entriesMonthlyBalance.loading
    },
    balance () {
      return this.entriesMonthlyBalance ?? null
    }
  }
}
</script>


<template>
  <!-- eslint-disable vue/no-v-html -->
  <AppContainer
    v-model="collapse"
    collapsible
  >
    <template #title>
      Receita mensal
    </template>
    <template #body>
      <div
        v-show="isQueryLoading"
      >
        <AppLoading />
      </div>

      <div
        v-if="balance !== null"
      >
        <div class="text-center">
          <div class="text-secondary mb-2">
            Soma dos valores não lançados de
            <b>
              {{
                DateTime.now().toFormat('LLLL', {
                  locale: 'pt-BR'
                })
              }}
            </b>
          </div>
          <h3
            class="text-success"
            v-html="$helpers.toBRL(balance.current, true)"
          />
        </div>
        <div class="text-end">
          <span class="text-secondary me-1">Mês passado:</span>
          <span class="fw-bold text-success">{{ $helpers.toBRL(balance.previous) }}</span>
        </div>
      </div>
    </template>
  </AppContainer>
</template>
