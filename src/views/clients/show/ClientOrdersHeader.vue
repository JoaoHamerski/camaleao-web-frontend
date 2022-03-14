<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { orders } from '@/constants/route-names'

export default {
  data () {
    return {
      orders,
      search: '',
      icons: {
        faPlus
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
    <div class="d-flex justify-content-between">
      <AppButton
        color="primary"
        @click="$helpers.redirectTo(orders.create, {client: $route.params.clientKey})"
      >
        <FontAwesomeIcon
          class="mr-1"
          :icon="icons.faPlus"
        />
        Novo pedido
      </AppButton>

      <div class="col-5">
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
              @click="onSearch"
            >
              Buscar
            </AppButton>
          </template>
        </AppInput>
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
