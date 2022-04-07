<script>
import roles from '@/constants/roles'
import { faPlus, faList, faSearch } from '@fortawesome/free-solid-svg-icons'

import ModalExpensesNew from './modals/ModalExpensesNew.vue'

export default {
  components: {
    ModalExpensesNew,
    ModalExpensesTypes: () => import('./modals/ModalExpensesTypes')
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
      modalExpensesTypes: false
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
    }
  }
}
</script>

<template>
  <div>
    <ModalExpensesNew
      v-model="modalExpensesRegister"
      :expense-types="expenseTypes"
      :vias="vias"
      @success="onExpenseRegisterSuccess"
    />

    <ModalExpensesTypes
      v-if="$helpers.canView(roles.GERENCIA)"
      v-model="modalExpensesTypes"
      :expense-types="expenseTypes"
    />

    <div class="d-flex justify-content-between mb-2">
      <AppButton
        class="flex-grow-1 flex-sm-grow-0 me-1 me-sm-0"
        :icon="icons.faPlus"
        color="success"
        btn-class="fw-bold"
        @click="onRegisterExpenseClick"
      >
        Cadastrar despesa
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
