<script>
import { get } from 'lodash-es'
import Form from '@/utils/Form'
import { handleError } from '@/utils/forms'

import { GetConfig } from '@/graphql/Config.gql'
import { UploadBudgetGeneratorSettings } from '@/graphql/Budget.gql'

export default {
   apollo: {
    generatorSettings: {
      query: GetConfig,
      variables: {
        name: 'app',
        key: 'budget_generator_settings',
        encoded: false
      },
      update(data) {
        const config = JSON.parse(data.configGet)
        const apiUrl = process.env.VUE_APP_API_HTTP

        if (!config) {
          return config
        }

        if (config.logo) {
          config.logo = `${apiUrl}/storage/budget_settings/${config.logo}`
        }

        return config
      },
      result() {
        this.populateForm()
      }
    }
  },
  data () {
    return {
      generatorSettings: {},
      isLoading: false,
      form: new Form({
        logo: '',
        header: '',
        content: '',
        date: ''
      })
    }
  },
  computed: {
    isQueryLoading () {
      return !!this.$apollo.queries.generatorSettings.loading
    },
    navItems () {
      return [
        {
          value: 'logo',
          text: 'Logo',
          fields: ['logo']
        },
        {
          value: 'header',
          text: 'Cabeçalho',
          fields: ['header']
        },
        {
          value: 'content',
          text: 'Conteúdo',
          fields: ['content']
        },
        {
          value: 'date',
          text: 'Data',
          fields: ['date']
        },
      ]
    }
  },
  methods: {
    populateForm() {
      Object.assign(this.form, this.generatorSettings || {})
    },
    configHasImage(prop) {
      return get(this.generatorSettings, prop)
    },
    async onFileUpload(files, prop) {
      const base64File = await this.$helpers.inputFileToBase64(files[0])

      this.form[prop] = base64File
      this.form.errors.clear(prop)
    },
    async onSubmit () {
      const input = this.form.data()
      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: UploadBudgetGeneratorSettings,
          variables: {
            input
          }
        })

        this.$toast.success('Configurações atualizadas!')
      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <form
    @submit.prevent="onSubmit"
  >
    <AppLoading v-show="isQueryLoading" />
    <AppNavPills
      :items="navItems"
      :errors="Object.keys(form.errors.errors)"
    >
      <template #logo>
        <AppInputFile
          id="logo"
          accept="image/*"
          centered
          @input="(event) => onFileUpload(event, 'logo')"
        />

        <template v-if="form.logo">
          <div class="form-label fw-bold">
            {{ configHasImage('logo') ? 'Logo armazenada:' : 'Pré-visualização:' }}
          </div>
          <div class="col-4">
            <img
              class="img-fluid img-thumbnail"
              :src="form.logo"
              alt="Logo"
            >
          </div>
        </template>
      </template>

      <template #header>
        <AppEditor
          v-model="form.header"
          :error="form.errors.get('header')"
          placeholder="Digite o cabeçalho..."
          @focus="form.errors.clear('header')"
        />
      </template>

      <template #content>
        <div class="text-secondary small">
          Informe os seguintes caracteres para serem substituídos por dados:
          <ul>
            <li><b>%cliente%</b> - Nome do cliente (Ex.: José da Penha)</li>
            <li><b>%produto%</b> - Produto do recibo (Ex.: Camisa personalizada)</li>
          </ul>
        </div>
        <AppEditor
          v-model="form.content"
          :error="form.errors.get('content')"
          placeholder="Digite o conteúdo..."
          @focus="form.errors.clear('content')"
        />
      </template>

      <template #date>
        <div class="text-secondary small">
          Informe os seguintes caracteres para serem substituídos por dados:
          <ul>
            <li><b>%data%</b> - Data por extenso (Ex.: 01 de Janeiro de 2020)</li>
          </ul>
        </div>
        <AppEditor
          v-model="form.date"
          :error="form.errors.get('date')"
          placeholder="Digite a data..."
          @focus="form.errors.clear('date')"
        />
      </template>
    </AppNavPills>

    <div class="row mt-3">
      <div class="col">
        <AppButton
          :loading="isLoading"
          block
          btn-class="fw-bold"
          color="success"
          type="submit"
        >
          Salvar
        </AppButton>
      </div>
      <div class="col">
        <AppButton
          type="button"
          :disabled="isLoading"
          block
          color="light"
          data-bs-dismiss="modal"
        >
          Fechar
        </AppButton>
      </div>
    </div>
  </form>
</template>
