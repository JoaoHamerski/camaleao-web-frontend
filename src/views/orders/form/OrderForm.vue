<script>

import Form from '@/utils/Form'
import { formatDatetime } from '@/utils/formatters'
import { map, pick } from 'lodash-es'
import { CreateOrder, UpdateOrder } from '@/graphql/Order.gql'
import { handleError } from '@/utils/forms'

import OrderFormClient from './OrderFormClient'
import OrderFormBasicInfo from './OrderFormBasicInfo'
import OrderFormValues from './OrderFormValues'
import OrderFormProduction from './OrderFormProduction'
import OrderFormFiles from './OrderFormFiles'

export default {
  components: {
    OrderFormClient,
    OrderFormBasicInfo,
    OrderFormValues,
    OrderFormProduction,
    OrderFormFiles
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    order: {
      type: Object,
      default: () => {}
    },
    isOrderPreRegistered: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isLoading: false,
      form: new Form({
        name: '',
        code: '',
        client_id: '',
        discount: '',
        down_payment: '',
        payment_via_id: '',
        production_date: '',
        delivery_date: '',
        clothing_types: [],
        art_paths: [],
        size_paths: [],
        payment_voucher_paths: []
      })
    }
  },
  mounted () {
    this.$on('order-loaded', ({ order }) => {
      this.populateForm(order)
    })
  },
  methods: {
    getFile (item) {
      return item.base64 || item
    },
    getFormattedForm () {
      const form = { ...this.form.data() }

      form.client_id = form.client_id?.id || ''
      form.art_paths = map(form.art_paths, this.getFile)
      form.size_paths = map(form.size_paths, this.getFile)
      form.payment_voucher_paths = map(form.payment_voucher_paths, this.getFile)

      return form
    },
    async update () {
      const data = this.getFormattedForm()

      try {
        const { data: { orderUpdate: { id, client } } } = await this.$apollo.mutate({
          mutation: UpdateOrder,
          variables: {
            id: this.order.id,
            input: { ...data }
          }
        })

        this.$helpers.clearCacheFrom({ fieldName: 'weeklyProduction' })
        this.$emit('success', { orderId: id, clientId: client.id })
      } catch (error) {
        handleError(this, error)
      }
    },
    async create () {
      const data = this.getFormattedForm()
      const { clientKey } = this.$route.params

      try {
        const { data: { orderCreate: { id } } } = await this.$apollo.mutate({
          mutation: CreateOrder,
          variables: {
            client_id: clientKey,
            input: { ...data }
          }
        })

        this.$helpers.clearCacheFrom([
          { id: clientKey, __typename: 'Client' },
          { fieldName: 'orders' }
        ])

        this.$emit('success', { orderId: id, clientId: clientKey })
      } catch (error) {
        console.log(error)
        handleError(this, error)
      }
    },
    populateForm (order) {
      const fields = pick(order, [
        'name',
        'price',
        'code',
        'discount',
        'production_date',
        'delivery_date',
        'art_paths',
        'size_paths',
        'payment_voucher_paths'
      ])

      fields.discount = +fields.discount === 0
        ? 'R$ '
        : this.$helpers.toBRL(fields.discount)
      fields.price = this.$helpers.toBRL(fields.price)
      fields.production_date = formatDatetime(fields.production_date)
      fields.delivery_date = formatDatetime(fields.delivery_date)

      for (const field in fields) {
        this.form[field] = fields[field]
      }

      this.$on('clothing-types-loaded', () => {
        this.populateClothingTypes(order.clothing_types)
      })
    },
    async onSubmit () {
      this.isLoading = true

      if (this.isEdit) {
        await this.update()
      } else {
        await this.create()
      }

      this.isLoading = false
    },
    onClothingTypesLoaded (clothingTypes) {
      if (this.form.clothing_types.length) {
        this.$emit('clothing-types-loaded')
        return
      }

      for (const type of clothingTypes) {
        this.form.clothing_types.push({
          key: type.key,
          value: 'R$ ',
          quantity: ''
        })
      }

      this.$emit('clothing-types-loaded')
    },
    populateClothingTypes (clothingTypes) {
      this.form.clothing_types.forEach((type, index) => {
        const searchType = clothingTypes.find(
          (searchType) => searchType.key === type.key
        )

        if (searchType) {
          this.form.clothing_types[index].value = this.$helpers.toBRL(searchType.value)
          this.form.clothing_types[index].quantity = searchType.quantity
        }
      })
    },
    onSelectFiles ({ files, field }) {
      this.form[field].push(...files)
    },
    onDeleteFile ({ fileKey, field }) {
      const index = this.form[field].findIndex(
        file => file.key === fileKey || file === fileKey
      )

      this.form[field].splice(index, 1)
    }
  }
}
</script>

<template>
  <AppForm
    :on-submit="onSubmit"
    :form="form"
  >
    <OrderFormClient
      v-if="order && !order.client"
      :form="form"
    />

    <OrderFormBasicInfo :form="form" />

    <OrderFormValues
      v-bind="{order, form, isEdit, isOrderPreRegistered}"
      @clothing-types-loaded="onClothingTypesLoaded"
    />

    <OrderFormProduction :form="form" />

    <OrderFormFiles
      v-bind="{form, isEdit}"
      @selected-files="onSelectFiles"
      @delete-file="onDeleteFile"
    />

    <div class="mt-5">
      <AppButton
        type="submit"
        :loading="isLoading"
        color="success"
        class="fw-bold"
      >
        {{ isEdit ? 'Atualizar' : 'Cadastrar' }}
      </AppButton>
    </div>
  </AppForm>
</template>
