<script>
import { GetBankMirrorEntriesNavs, GetBankMirrorEntries } from '@/graphql/Entry.gql'

import BankMirrorEntries from './BankMirrorEntries.vue'

export default {
  components: {
    BankMirrorEntries
  },
  apollo: {
    entriesBankMirror: {
      query: GetBankMirrorEntries,
      deep: true,
      variables () {
        return {
          ...this.entriesBankMirrorVars
        }
      },
      skip () {
        return this.skipEntriesBankMirror
      }
    },
    entriesBankMirrorNavs: {
      query: GetBankMirrorEntriesNavs,
      update ({ entriesBankMirrorNavs }) {
        return entriesBankMirrorNavs.map(({via: { id, name }, count}) => ({
          id,
          value: id,
          text: name,
          count
        }))
      },
      result () {
        this.isViaLoaded = true
        this.skipEntriesBankMirror = false
      }
    },
  },
  data () {
    return {
      entriesBankMirrorNavs: [],
      isViaLoaded: false,
      skipEntriesBankMirror: true,
      entriesBankMirror: {
        data: [],
        paginatorInfo: {}
      },
      entriesBankMirrorVars: {
        first: 10,
        page: 1,
        where: {
          column: 'VIA_ID',
          operator: 'EQ',
          value: ''
        },
      },
    }
  },
  computed: {
    isEntriesQueryLoading () {
      return !!this.$apollo.queries.entriesBankMirror.loading
    },
    isNavsQueryLoading () {
      return !!this.$apollo.queries.entriesBankMirrorNavs.loading
    }
  },
  watch: {
    isViaLoaded (value) {
      if (value) {
        this.onNavSelected(this.entriesBankMirrorNavs[0].id)
      }
    }
  },
  methods: {
    refreshEntries () {
      this.$apollo.queries.entriesBankMirror.refetch()
    },
    onNavSelected (value) {
      this.entriesBankMirrorVars.where.value = value
    }
  }
}
</script>

<template>
  <div>
    <AppLoading v-show="isNavsQueryLoading" />
    <AppNavPills
      :items="entriesBankMirrorNavs"
      @nav-selected="onNavSelected"
    >
      <template
        v-for="via in entriesBankMirrorNavs"
        #[`${via.id}`]
      >
        <div
          :key="via.id"
          class="position-relative"
        >
          <AppLoading v-show="isEntriesQueryLoading" />
          <BankMirrorEntries
            :entries="entriesBankMirror.data"
          />
        </div>
      </template>
    </AppNavPills>

    <AppPaginator
      v-model="entriesBankMirrorVars.page"
      :pagination="entriesBankMirror.paginatorInfo"
      :is-loading="isEntriesQueryLoading"
    />
  </div>
</template>
