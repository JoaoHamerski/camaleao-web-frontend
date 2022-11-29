<script>
import { isEmpty } from 'lodash-es'
import { faDownload, faSync } from '@fortawesome/free-solid-svg-icons'
import { GetBankEntries } from '@/graphql/BankEntry.gql'
import { formatDatetime } from '@/utils/formatters'

export default {
  apollo: {
    bankEntries: {
      query: GetBankEntries,
      variables () {
        return {
          first: 6,
          page: this.page
        }
      }
    }
  },
  props: {
    entry: {
      type: Object,
      default: () => ({})
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      bankEntries: {
        data: [],
        paginatorInfo: {}
      },
      icons: {
        faDownload,
        faSync
      },
      page: 1
    }
  },
  computed: {
    isLoadingQuery () {
      return !!this.$apollo.queries.bankEntries.loading
    }
  },
  methods: {
    formatDatetime,
    isEmpty,
    refresh() {
      this.$apollo.queries.bankEntries.refetch()
    },
    onEntryClick(entry) {
      this.$emit('load-entry', entry)
    },
    isActive (entry) {
      return entry.filename === this.entry?.filename
    }
  }
}
</script>

<template>
  <AppContainer
    collapsible
    :value="true"
  >
    <template #title>
      Lista de entradas bancárias
    </template>

    <template #body>
      <AppLoading
        v-show="isLoadingQuery || isLoading"
        class="py-5"
      />

      <div
        v-if="!bankEntries.data.length"
        class="text-center text-secondary small my-5"
      >
        Nenhuma entrada encontrada
      </div>
      <div
        v-else
        class="row row-cols-1 row-cols-sm-3 gx-0 mb-2"
      >
        <button
          v-for="item in bankEntries.data"
          :key="item.id"
          class="btn d-flex align-items-center"
          :class="isActive(item) ? 'btn-outline-success' : 'btn-outline-primary'"
          @click.prevent="onEntryClick(item)"
        >
          <div class="me-2">
            <FontAwesomeIcon
              :icon="icons.faDownload"
              size="lg"
            />
          </div>
          <div class="text-start text-truncate">
            <div class="text-truncate">
              {{ item.filename }}
            </div>
            <span class="datetime text-secondary">{{ formatDatetime(item.created_at) }}</span>
          </div>
        </button>
      </div>

      <div class="d-flex flex-column flex-sm-row justify-content-between">
        <AppPaginator
          v-model="page"
          :pagination="bankEntries.paginatorInfo"
        />
        <AppButton
          outlined
          btn-class="btn-sm"
          :icon="icons.faSync"
          @click.prevent="refresh"
        />
      </div>
    </template>
  </AppContainer>
</template>

<style lang="scss" scoped>
.datetime {
  font-size: .7rem;
  transition: color .25s;
}

.btn:hover {
  .datetime {
    color: white !important
  }
}
</style>
