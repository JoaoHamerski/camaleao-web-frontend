<script>
import SelectClientsFind from '@/views/resources/SelectClientsFind.vue'

export default {
  components: {
    SelectClientsFind
  },
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
  methods: {
    onClientSelect(id) {
      this.removeCurrentOrder()

      this.form.set({'client.id': id})
    },
    removeCurrentOrder () {
      this.form.set({'order.id': ''})
    },
    toggleClientState () {
      if (!this.form.client.isNew) {
        this.form.set({
          'client.id': '',
          'order.id': ''
        })
      }


      this.form.set({'client.isNew': !this.form.client.isNew})
      this.form.set({'order.isNew': this.form.client.isNew})
    }
  }
}
</script>

<template>
  <div
    v-if="!form.client.isNew"
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

    <SelectClientsFind
      id="client"
      :value="form.client.id"
      :error="form.errors.get('client.id')"
      @input="onClientSelect"
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
    </SelectClientsFind>
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
      :value="form.client.name"
      :error="form.errors.get('client.name')"
      name="client.name"
      placeholder="Nome do cliente"
      @input="form.set({'client.name': $event})"
    />
  </div>
</template>
