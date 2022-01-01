<script>
import axios from 'axios'
import { formatPhone } from '@/utils/formatters'

export default {
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      clients: {
        isLoading: false,
        items: []
      }
    }
  },
  computed: {
    apiUrl () {
      return this.$store.getters.apiURL
    }
  },
  methods: {
    removeCurrentOrder () {
      this.form.order = ''
    },
    toggleClientState () {
      if (!this.form.isNewClient) {
        this.form.client = ''
        this.form.order = ''
      }

      this.form.isNewClient = !this.form.isNewClient
      this.form.isNewOrder = this.form.isNewClient
    },
    customLabelClients ({ name, phone }) {
      return `${name} ${phone ? ' - ' + formatPhone(phone) : ''}`
    },
    async asyncFindClients (query) {
      if (!query.length) {
        this.clients.items = []
        return
      }

      this.clients.isLoading = true

      const { data } = await axios.get(`${this.apiUrl}/api/clients`, {
        params: {
          search: query
        }
      })

      this.clients.isLoading = false
      this.clients.items = data.data
    }
  }
}
</script>

<template>
  <div
    v-if="!form.isNewClient"
    class="mb-4"
  >
    <div class="d-flex justify-content-between align-items-center mb-2">
      <label
        for="client"
        class="fw-bold form-label text-primary"
      >Cliente</label>
      <AppButton
        color="success"
        class="fw-bold"
        btn-class="btn-sm"
        @click.prevent="toggleClientState"
      >
        Cadastrar novo
      </AppButton>
    </div>
    <AppSelect
      v-model="form.client"
      name="client"
      placeholder="Procure por nome ou telefone"
      :error="form.errors.get('client.id')"
      :custom-label="customLabelClients"
      :searchable="true"
      :internal-search="false"
      :options="clients.items"
      :loading="clients.isLoading"
      @open="form.errors.clear('client.id')"
      @search-change="asyncFindClients"
      @remove="removeCurrentOrder"
      @select="removeCurrentOrder"
    >
      <template #noOptions>
        Faça uma busca para exibir resultados
      </template>
      <template #noResult>
        Nenhum cliente encontrado, <a
          href="#"
          class="fw-bold text-decoration-none"
          @click.prevent="toggleClientState"
        >cadastrar novo</a>
      </template>
    </AppSelect>
  </div>
  <div
    v-else
    class="mb-4"
  >
    <div class="d-flex justify-content-between align-items-center mb-2">
      <label
        for="client"
        class="fw-bold form-label"
      >Nome do cliente</label>
      <AppButton
        color="primary"
        class="fw-bold"
        btn-class="btn-sm"
        @click.prevent="toggleClientState"
      >
        Procurar cliente
      </AppButton>
    </div>
    <AppInput
      id="client"
      v-model="form.client"
      :error="form.errors.get('client')"
      name="client"
      placeholder="Nome do cliente"
    />
  </div>
</template>
