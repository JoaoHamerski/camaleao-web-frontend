<script>
import {
  faTrashAlt,
  faExclamationCircle,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons'

import Form from '@/utils/Form'
import { handleError, handleSuccess } from '@/utils/forms'
import { GetSimpleCities, DeleteCity } from '@/graphql/City.gql'

export default {
  apollo: {
    cities: {
      query: GetSimpleCities
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    city: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      isLoading: false,
      replaceCity: false,
      form: new Form({
        city: '',
        replace: {
          clients: false,
          branches: false
        }
      }),
      icons: {
        faTrashAlt,
        faExclamationCircle,
        faQuestionCircle
      }
    }
  },
  watch: {
    replaceCity (value) {
      if (value === false) {
        this.form.replace.clients = false
        this.form.replace.branches = false
      }
    }
  },
  methods: {
    getFormattedData () {
      const data = { ...this.form.data() }

      data.city = data.city?.id || ''

      return data
    },
    async onDelete () {
      const data = this.getFormattedData()

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: DeleteCity,
          variables: {
            id: this.city.id,
            city_id: data.city,
            replace: data.replace
          }
        })

        this.$helpers.clearCacheFrom({ id: this.city.id, __typename: 'City' })

        handleSuccess(this, { message: 'Cidade deletada!' })
      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
    },
    customLabelCity (city) {
      if (city.state) {
        return `${city.name} - ${city.state.abbreviation}`
      }

      return `${city.name} - N/A`
    }
  }
}
</script>

<template>
  <AppModal
    id="deleteCityModal"
    :value="value"
    color="danger"
    v-on="$listeners"
  >
    <template #title>
      Deletar cidade
    </template>

    <template #body>
      <div class="text-center">
        <FontAwesomeIcon
          class="text-danger"
          :icon="icons.faTrashAlt"
          size="4x"
        />

        <h6 class="fw-bold mt-3 text-danger">
          Você está deletando a seguinte cidade:
        </h6>
      </div>

      <div
        v-if="value"
        class="mb-3"
      >
        <h5 class="text-center text-primary fw-bold mt-4 mb-0">
          {{ city.name }}
        </h5>
        <small
          v-if="city.state"
          class="d-block fw-bold text-center"
        >
          {{ city.state.name }} ({{ city.state.abbreviation }})
        </small>
      </div>

      <div class="text-secondary text-subtitle">
        <div>
          <FontAwesomeIcon
            :icon="icons.faExclamationCircle"
            fixed-width
            class="text-primary"
          />
          Qualquer cidade de cliente relacionado com está cidade será desvinculado.
        </div>
        <div>
          <FontAwesomeIcon
            :icon="icons.faExclamationCircle"
            fixed-width
            class="text-primary"
          />
          Qualquer filial registrada no nome dessa cidade será removida.
        </div>
        <div>
          <FontAwesomeIcon
            :icon="icons.faExclamationCircle"
            fixed-width
            class="text-primary"
          />
          Qualquer cidade de filiais vinculadas serão desvinculadas.
        </div>
      </div>

      <div class="mt-3">
        <div class="d-flex align-items-baseline">
          <AppCheckbox
            id="replace_city"
            v-model="replaceCity"
            class="me-2"
          >
            Selecionar cidade para substituir
          </AppCheckbox>
          <FontAwesomeIcon
            v-tippy
            :icon="icons.faQuestionCircle"
            class="text-primary"
            content="Selecione uma cidade para substituir a cidade deletada nos clientes e filiais vinculados a ela. "
          />
        </div>
      </div>

      <div
        v-if="replaceCity"
        class="mb-4"
      >
        <label class="form-label fw-bold">Substituir:</label>
        <AppCheckbox
          id="replace_clients"
          v-model="form.replace.clients"
          :default-margin="false"
        >
          Clientes
        </AppCheckbox>
        <AppCheckbox
          id="replace_branches"
          v-model="form.replace.branches"
        >
          Filiais
        </AppCheckbox>
        <AppForm
          :form="form"
          :on-submit="onDelete"
        >
          <AppSelect
            v-model="form.city"
            name="city_id"
            placeholder="Selecione uma cidade"
            :options="cities"
            :custom-label="customLabelCity"
            :error="form.errors.get('city_id')"
          >
            Cidade:
          </AppSelect>
        </AppForm>
      </div>

      <div class="row mt-2">
        <div class="col">
          <AppButton
            btn-class="fw-bold"
            block
            color="success"
            :loading="isLoading"
            @click.prevent="onDelete"
          >
            {{ replaceCity ? 'Concluir' : 'Deletar' }}
          </AppButton>
        </div>

        <div class="col">
          <AppButton
            type="button"
            data-bs-dismiss="modal"
            block
            color="light"
          >
            Cancelar
          </AppButton>
        </div>
      </div>
    </template>
  </AppModal>
</template>
