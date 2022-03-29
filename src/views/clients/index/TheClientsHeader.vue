<script>
import { faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import ClientModalNew from '../partials/ClientModalNew'

import { COLUMNS } from './TheClients'

export default {
  components: {
    ClientModalNew
  },
  data () {
    return {
      newClientModal: false,
      form: {
        option: COLUMNS.NAME,
        search: ''
      },
      icons: {
        faUserPlus,
        faSearch
      }
    }
  },
  computed: {
    selectOptions () {
      return [
        { name: 'Nome', value: COLUMNS.NAME },
        { name: 'Cidade', value: COLUMNS.CITY },
        { name: 'Telefone', value: COLUMNS.PHONE }
      ]
    }
  },
  methods: {
    onNewClientClick () {
      this.newClientModal = true
    },
    onNewClientSuccess () {
      this.newClientModal = false
    },
    getFormattedSearch () {
      if (this.form.option === COLUMNS.PHONE) {
        if (this.form.search.startsWith('(')) {
          return this.getSearchByDDD()
        }
      }

      return `%${this.form.search}%`
    },
    getSearchByDDD () {
      const search = this.$helpers.stripNonDigits(this.form.search)

      return `${search}%`
    },
    getColumnOption () {
      return this.form.option === COLUMNS.CITY
        ? 'NAME'
        : this.form.option
    },
    getQueryToSearch (options) {
      const isCityOptionSelected = this.form.option === COLUMNS.CITY

      return {
        hasCity: isCityOptionSelected ? options : null,
        where: !isCityOptionSelected ? options : null
      }
    },
    handleSearch () {
      const value = this.getFormattedSearch()
      const column = this.getColumnOption()
      const options = {
        value,
        operator: 'LIKE',
        column
      }

      const query = this.getQueryToSearch(options)

      this.$emit('search', query)
    },
    clearSearch () {
      this.form.search = ''
      this.$emit('search-clear')
    }
  }
}
</script>
<template>
  <div>
    <ClientModalNew
      v-model="newClientModal"
      @success="onNewClientSuccess"
    />

    <div class="d-flex flex-column flex-sm-row justify-content-between">
      <AppButton
        color="success"
        class="fw-bold mb-3 mb-sm-0"
        @click.prevent="onNewClientClick"
      >
        <FontAwesomeIcon
          fixed-width
          :icon="icons.faUserPlus"
        />
        Novo cliente
      </AppButton>

      <div class="col-12 col-sm-5">
        <AppInput
          v-model="form.search"
          name="search"
          :default-margin="false"
          placeholder="Digite a busca..."
          @keypress.enter="handleSearch"
        >
          <template #append>
            <AppSimpleSelect
              v-model="form.option"
              remove-default-margin
              name="option"
              hide-default-option
              value-prop="value"
              label-prop="name"
              :options="selectOptions"
            />
            <AppButton
              :icon="icons.faSearch"
              outlined
              @click="handleSearch"
            />
          </template>
        </AppInput>
      </div>
    </div>

    <div
      v-show="form.search"
      class="text-end"
    >
      <span
        class="clickable link-primary small"
        @click="clearSearch"
      >
        Limpar busca
      </span>
    </div>
  </div>
</template>
