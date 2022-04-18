<script>
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Form from '@/utils/Form'
import { handleSuccess, handleError } from '@/utils/forms'
import { DeleteStatus } from '@/graphql/Status.gql'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    status: {
      type: Object,
      default: null
    },
    statusList: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      isLoading: false,
      form: new Form({
        replace_status_id: '',
        password: ''
      }),
      icons: {
        faTrashAlt
      }
    }
  },
  computed: {
    statusListComputed () {
      return this.statusList.filter(({id}) => this.status.id !== id)
    }
  },
  methods: {
    async onDelete () {
      const input = this.form.data()

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: DeleteStatus,
          variables: {
            id: this.status.id,
            input
          }
        })

        handleSuccess(this, {message: 'Status deletado!', resetForm: true})

        this.$helpers.clearCacheFrom({fieldName: 'status'})
      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <AppModal
    id="modalStatusDelete"
    color="danger"
    :value="value"
    v-bind="$attrs"
    centered
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faTrashAlt"
        fixed-width
      />

      Deletar status
    </template>
    <template #body>
      <div v-if="status">
        <div class="text-center">
          <FontAwesomeIcon
            :icon="icons.faTrashAlt"
            class="text-danger"
            size="4x"
          />
          <h6 class="mt-3">
            Você está deletando o status
            <h5 class="fw-bold">
              {{ status.text }}
            </h5>
          </h6>
        </div>

        <div>
          <AppForm
            v-if="value"
            :form="form"
            :on-submit="onDelete"
          >
            <AppSimpleSelect
              id="replace_status_id"
              v-model="form.replace_status_id"
              name="replace_status_id"
              :options="statusListComputed"
              label-prop="text"
              value-prop="id"
              :error="form.errors.get('replace_status_id')"
            >
              Pedidos com esse status irão ser substituídos por:
            </AppSimpleSelect>

            <AppInput
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              placeholder="Digite sua senha..."
              :error="form.errors.get('password')"
            >
              Digite sua senha para confirmar:
            </AppInput>

            <div class="row mt-3">
              <div class="col">
                <AppButton
                  type="submit"
                  color="success"
                  btn-class="fw-bold"
                  block
                  :loading="isLoading"
                >
                  Confirmar
                </AppButton>
              </div>
              <div class="col">
                <AppButton
                  type="button"
                  color="light"
                  block
                  data-bs-dismiss="modal"
                  :disabled="isLoading"
                >
                  Cancelar
                </AppButton>
              </div>
            </div>
          </AppForm>
        </div>
      </div>
    </template>
  </AppModal>
</template>
