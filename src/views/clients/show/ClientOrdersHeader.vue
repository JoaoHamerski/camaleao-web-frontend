<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    code: {
      type: String,
      default: ''
    }
  },
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
    }
  }
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between">
      <AppButton color="primary">
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
      {{ code !== '' ? 'Limpar busca' : '' }}
    </a>
  </div>
</template>
