<script>
import { faPlus, faSearch, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { orders } from '@/constants/route-names'

export default {
  data () {
    return {
      orders,
      search: '',
      icons: {
        faPlus,
        faSearch,
        faArrowAltCircleLeft
      }
    }
  },
  methods: {
    onSearch () {
      this.$emit('search', this.search)
    },
    clearSearch () {
      this.search = ''
      this.$emit('clear-search')
    }
  }
}
</script>

<template>
  <div>
    <div class="d-flex row flex-column flex-sm-row justify-content-between">
      <div class="col-sm-3 mb-1">
        <AppButton
          outlined
          @click="$router.push({name: 'clients.index'})"
        >
          <FontAwesomeIcon :icon="icons.faArrowAltCircleLeft" />
          Clientes
        </AppButton>
      </div>

      <div class="col d-flex flex-column flex-sm-row justify-content-between">
        <div class="col col-sm-2">
          <AppButton
            class="mb-2 mb-sm-0"
            btn-class="fw-bold w-100"
            color="primary"
            @click="$helpers.redirectTo(orders.create, {client: $route.params.clientKey})"
          >
            <FontAwesomeIcon
              class="mr-1"
              :icon="icons.faPlus"
            />
            Novo pedido
          </AppButton>
        </div>
        <div class="col col-sm-4">
          <AppInput
            v-model="search"
            :default-margin="false"
            name="code"
            placeholder="Buscar por código..."
            @keypress.enter="onSearch"
          >
            <template #append>
              <AppButton
                color="primary"
                outlined
                :icon="icons.faSearch"
                @click="onSearch"
              />
            </template>
          </AppInput>
        </div>
      </div>
    </div>
    <div
      class="link-primary clickable small text-decoration-none d-flex justify-content-end mb-1"
      @click.prevent="clearSearch"
    >
      {{ search !== '' ? 'Limpar busca' : '' }}
    </div>
  </div>
</template>
