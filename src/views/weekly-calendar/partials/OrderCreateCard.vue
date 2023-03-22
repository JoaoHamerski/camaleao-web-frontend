<script>
import { faBoxOpen, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import Form from '@/utils/Form'
import { handleError } from '@/utils/forms'
import { formatDatetime } from '@/utils/formatters'

import {
  CreatePreRegisteredOrder,
  GetWeeklyCalendarOrders,
  ReorderWeeklyCalendar
} from '@/graphql/WeeklyCalendar.gql'
import { GetStatus } from '@/graphql/Status.gql'

export default {
  props: {
    isOrderable: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    },
    order: {
      type: Object,
      default: () => ({})
    },
    orders: {
      type: Array,
      default: () => []
    }
  },
  apollo: {
    status: {
      query: GetStatus
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
      const { date } = this.order

      return {
        reminder,
        status_id,
        [this.order.date_field]: formatDatetime(date),
        art_paths: [this.order.image.base64]
      }
    },
    async onSubmitAndReorder (input) {
      const {data: { orderCreatePreRegistered: { id: preCreatedOrderId }}} = await this.$apollo.mutate({
        mutation: CreatePreRegisteredOrder,
        variables: { input },
      })

      const orderedOrders = this.orders.map(({id}, index) => ({id, order: index}))
      const preCreatedIndex = orderedOrders.findIndex(order => order.id.match(/^pre-created/))

      orderedOrders.splice(preCreatedIndex, 1, {id: preCreatedOrderId, order: preCreatedIndex, })

      await this.$apollo.mutate({
        mutation: ReorderWeeklyCalendar,
        variables: {
          input: orderedOrders
        },
        awaitRefetchQueries: true,
        refetchQueries: [GetWeeklyCalendarOrders]
      })
    },
    isImageError(error) {
      const { graphQLErrors: {0: {extensions: { validation}}} } = error

      return 'art_paths.0' in validation
    },
    async onSubmit (input) {
      await this.$apollo.mutate({
        mutation: CreatePreRegisteredOrder,
        variables: { input },
        awaitRefetchQueries: true,
        refetchQueries: [GetWeeklyCalendarOrders]
      })
    },
    async submit () {
      const input = this.getFormattedForm()

      this.isLoading = true

      try {
        if (this.isOrderable) {
          await this.onSubmitAndReorder(input)
        } else {
          await this.onSubmit(input)
        }

        this.$helpers.clearCacheFrom({ fieldName: 'orders' })
        this.$toast.success('Pedido registrado!')
      } catch (error) {
        if (this.isImageError(error)) {
          this.$toast.error('Imagem muito grande, por favor, escolha outra.')
        } else {
          handleError(this, error)
        }
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
          :on-submit="submit"
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
            Status:
          </AppSimpleSelect>
        </AppForm>
      </div>
      <div class="card-footer d-flex p-0">
        <AppButton
          btn-class="fw-bold radius-0"
          color="success"
          class="flex-fill"
          :loading="isLoading"
          @click.prevent="submit"
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
      <div
        v-show="isOrderable"
        class="orderable-overflow"
      >
        <div>{{ index + 1 }}</div>
      </div>
    </div>
  </div>
</template>
