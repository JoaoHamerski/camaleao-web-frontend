<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default {
  data () {
    return {
      search: '',
      icons: {
        faPlus
      }
    }
  },
  methods: {
    clearSearch () {
      this.search = ''
      this.$emit('clear-search')
    },
    redirectToNewOrder () {
      this.$router.push({
        name: 'orders.create',
        clientKey: this.$route.params.clientKey
      })
    }
  }
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between">
      <AppButton
        color="primary"
        @click="redirectToNewOrder"
      >
        <FontAwesomeIcon
          class="mr-1"
          :icon="icons.faPlus"
        /> Novo pedido
      </AppButton>

      <div class="col-5">
        <AppInput
          v-model="search"
          :default-margin="false"
          name="code"
          placeholder="Buscar por código..."
          @keypress.enter="$emit('search', search)"
        >
          <template #append>
            <AppButton
              color="primary"
              outlined
              @click="$emit('search', search)"
            >
              Buscar
            </AppButton>
          </template>
        </AppInput>
      </div>
    </div>
    <a
      href="#"
      class="small text-decoration-none d-flex justify-content-end mb-1"
      @click.prevent="clearSearch"
    >
      {{ search !== '' ? 'Limpar busca' : '' }}
    </a>
  </div>
</template>
