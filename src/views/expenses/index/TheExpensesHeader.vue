<script>
import roles from '@/constants/roles'
import { faPlus, faList, faSearch } from '@fortawesome/free-solid-svg-icons'

import ModalExpensesNew from './modals/ModalExpensesNew.vue'

export default {
  components: {
    ModalExpensesNew,
    ModalExpensesTypes: () => import('./modals/ModalExpensesTypes.vue'),
    ModalProductTypes: () => import('./modals/ModalProductTypes.vue'),
  },
  props: {
    expenses: {
      type: Array,
      default: () => ([])
    },
    vias: {
      type: Array,
      default: () => ([])
    },
    expenseTypes: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      roles,
      icons: {
        faPlus,
        faList,
        faSearch
      },
      search: '',
      modalExpensesRegister: false,
      modalExpensesTypes: false,
      modalProductTypes: false,
    }
  },
  methods: {
    onSearchClick () {
      this.$emit('search', this.search)
    },
    onSearchClear () {
      this.search = ''
      this.$emit('search', '')
    },
    onRegisterExpenseClick () {
      this.modalExpensesRegister = true
    },
    onExpensesTypesClick () {
      this.modalExpensesTypes = true
    },
    onExpenseRegisterSuccess () {
      this.modalExpensesRegister = false
    },
    onProductTypesClick () {
      this.modalProductTypes = true
    }
  }
}
</script>

<template>
  <div>
    <ModalExpensesNew
      v-model="modalExpensesRegister"
      @success="onExpenseRegisterSuccess"
    />

    <ModalExpensesTypes
      v-if="$helpers.canView(roles.GERENCIA)"
      v-model="modalExpensesTypes"
    />

    <ModalProductTypes
      v-if="$helpers.canView(roles.GERENCIA)"
      v-model="modalProductTypes"
    />

    <div class="d-flex flex-column flex-sm-row justify-content-between mb-2">
      <AppButton
        class="flex-grow-1 flex-sm-grow-0 me-1 me-sm-0 mb-2 mb-sm-0"
        :icon="icons.faPlus"
        color="success"
        btn-class="fw-bold"
        @click="onRegisterExpenseClick"
      >
        Cadastrar despesa
      </AppButton>

      <div class="d-flex">
        <AppButton
          v-if="$helpers.canView(roles.GERENCIA)"
          class="me-2"
          outlined
          :icon="icons.faList"
          @click="onProductTypesClick"
        >
          Tipos de produtos
        </AppButton>

        <AppButton
          v-if="$helpers.canView(roles.GERENCIA)"
          class="flex-grow-1 flex-sm-grow-0 ms-1 ms-sm-0"
          outlined
          :icon="icons.faList"
          @click="onExpensesTypesClick"
        >
          Tipos de despesas
        </AppButton>
      </div>
    </div>

    <div class="col col-sm-4 ms-auto">
      <AppInput
        v-model="search"
        name="search"
        placeholder="Buscar por descrição"
        :default-margin="false"
        @keypress.enter="onSearchClick"
      >
        <template #append>
          <AppButton
            outlined
            :icon="icons.faSearch"
            @click="onSearchClick"
          />
        </template>
      </AppInput>
      <div class="text-end small py-1">
        <span
          v-if="search"
          class="clickable link-primary"
          @click="onSearchClear"
        >Limpar busca</span>&nbsp;
      </div>
    </div>
  </div>
</template>
