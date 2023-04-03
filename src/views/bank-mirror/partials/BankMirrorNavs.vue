<script>
import { GetVias } from '@/graphql/Via.gql'
import { GetBankMirrorEntries } from '@/graphql/Entry.gql'

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
        return this.skip
      }
    },
    vias: {
      query: GetVias,
      update ({ vias }) {
        return vias.map(({id, name}) => ({
          id,
          value: id,
          text: name
        }))
      },
      result () {
        this.isViaLoaded = true
        this.skip = false
      }
    },
  },
  data () {
    return {
      vias: [],
      entriesBankMirror: {
        data: [],
        paginatorInfo: {}
      },
      isViaLoaded: false,
      skip: true,
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
    }
  },
  watch: {
    isViaLoaded (value) {
      if (value) {
        this.onNavSelected(this.vias[0].id)
      }
    }
  },
  methods: {
    onNavSelected (value) {
      this.entriesBankMirrorVars.where.value = value
    }
  }
}
</script>

<template>
  <div>
    <AppNavPills
      :items="vias"
      @nav-selected="onNavSelected"
    >
      <template
        v-for="via in vias"
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
