<script>
import { faBoxOpen, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import Form from '@/utils/Form'
import { handleError } from '@/utils/forms'
import { formatDatetime } from '@/utils/formatters'

import { CreatePreRegisteredOrder } from '@/graphql/WeeklyProduction.gql'
import { status } from '@/graphql/Status.gql'

export default {
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  apollo: {
    status: {
      query: status
    }
  },
  data () {
    return {
      status: [],
      isLoading: false,
      form: new Form({
        reminder: '',
        status_id: '',
        production_date: ''
      }),
      icons: {
        faBoxOpen,
        faQuestionCircle
      }
    }
  },
  methods: {
    getFormattedForm () {
      const { reminder, status_id } = this.form.data()
      const { production_date } = this.order

      return {
        reminder,
        status_id,
        production_date: formatDatetime(production_date),
        art_paths: [this.order.image.base64]
      }
    },
    async onSubmit () {
      const input = this.getFormattedForm()

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: CreatePreRegisteredOrder,
          variables: { input },
          refetchQueries: [
            'GetWeeklyProductionOrders'
          ]
        })

        this.$helpers.clearCacheFrom({ fieldName: 'orders' })
        this.$toast.success('Pedido registrado!')
      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
    },
    onCancel () {
      this.$emit('cancel-create', this.order)
    }
  }
}
</script>
<template>
  <div>
    <div class="card mb-2">
      <div class="card-header bg-camaleao fw-bold text-white py-2">
        <FontAwesomeIcon
          :icon="icons.faBoxOpen"
          fixed-width
        />
        NOVO PEDIDO
      </div>
      <div class="card-body p-0">
        <AppViewer>
          <img
            class="img-fluid img-thumbnail clickable"
            :src="order.image.base64"
            alt="Imagem do pedido a ser criado"
          >
        </AppViewer>
        <AppForm
          :form="form"
          :on-submit="onSubmit"
          class="mx-2 mt-2"
        >
          <AppTextarea
            id="reminder"
            v-model="form.reminder"
            name="reminder"
            placeholder="Algo que lembre o pedido..."
            optional
          >
            Lembrete:
            <template #hint>
              É altamente recomendado informar algum lembrete.
              <FontAwesomeIcon
                v-tippy
                :icon="icons.faQuestionCircle"
                class="text-primary"
                content="O pedido será cadastrado inicialmente sem cliente, apenas com imagem, pode ser difícil reconhecê-lo sem um lembrete. O lembrete será descartado assim que o cadastro completo do pedido for concluído"
              />
            </template>
          </AppTextarea>
          <AppSimpleSelect
            id="status_id"
            v-model="form.status_id"
            name="status_id"
            :options="status"
            placeholder="Selecione o status"
            optional
            value-prop="id"
            label-prop="text"
            select-class="form-select-sm"
          >
            Statuts:
          </AppSimpleSelect>
        </AppForm>
      </div>
      <div class="card-footer d-flex p-0">
        <AppButton
          btn-class="fw-bold radius-0"
          color="success"
          class="flex-fill"
          :loading="isLoading"
          @click.prevent="onSubmit"
        >
          Cadastrar
        </AppButton>
        <AppButton
          btn-class="radius-0"
          color="light"
          class="flex-fill"
          :disabled="isLoading"
          @click.prevent="onCancel"
        >
          Cancelar
        </AppButton>
      </div>
    </div>
  </div>
</template>
