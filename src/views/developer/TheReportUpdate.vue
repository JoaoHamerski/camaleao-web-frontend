<script>
import Form from '@/utils/Form'
import { marked } from 'marked'
import { CreateUpdateReport } from '@/graphql/UpdateReport.gql'

export default {
  metaInfo: {
    title: 'Relatórios de atualizações'
  },
  data () {
    return {
      marked,
      isLoading: false,
      form: new Form({
        description: ''
      })
    }
  },
  methods: {
    async onSubmit () {
      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: CreateUpdateReport,
          variables: {
            description: this.form.description
          }
        })

        this.$toast.success('Relatório enviado!')
        this.form.reset()
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado!')
      }

      this.isLoading = false
    },
    onEnterTextarea () {
      this.form.description = this.form.description + '\n'
    }
  }
}
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->

  <div class="py-5">
    <AppCard>
      <template #header>
        <h6 class="fw-bold mb-0">
          Texto do relatório
        </h6>
      </template>
      <template #body>
        <AppForm
          :on-submit="onSubmit"
          :form="form"
        >
          <textarea
            id="description"
            v-model="form.description"
            class="form-control"
            name="description"
            :rows="8"
            placeholder="Digite o texto..."
            @keypress.enter.stop.prevent="onEnterTextarea"
          />

          <div class="mt-3">
            <div class="fw-bold text-subtitle">
              Pre-visualização:
            </div>
            <div
              v-if="form.description !== ''"
              class="img-thumbnail bg-white"
              v-html="marked.parse(form.description)"
            />
            <div
              v-else
              class="text-secondary py-5 img-thumbnail bg-white text-center text-subtitle"
            >
              Sem texto
            </div>
          </div>

          <div class="mt-3">
            <AppButton
              color="success"
              btn-class="fw-bold"
              type="submit"
              :loading="isLoading"
            >
              Enviar
            </AppButton>
          </div>
        </AppForm>
      </template>
    </AppCard>
  </div>
</template>
