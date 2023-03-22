<script>

import Form from '@/utils/Form'
import { formatDatetime } from '@/utils/formatters'
import { map, pick } from 'lodash-es'
import { CreateOrder, UpdateOrder } from '@/graphql/Order.gql'
import { handleError } from '@/utils/forms'
import { GetDailyCashDetailedFlow, GetDailyCashBalance } from '@/graphql/DailyCash.gql'
import { GetClothingTypes } from '@/graphql/ClothingType.gql'

import OrderFormClient from './OrderFormClient.vue'
import OrderFormBasicInfo from './OrderFormBasicInfo.vue'
import OrderFormValues from './OrderFormValues.vue'
import OrderFormDates from './OrderFormDates.vue'
import OrderFormFiles from './OrderFormFiles.vue'

const NUMBER_OF_QUERIES = 1

export default {
  components: {
    OrderFormClient,
    OrderFormBasicInfo,
    OrderFormValues,
    OrderFormDates,
    OrderFormFiles
  },
  apollo: {
    clothingTypes: {
      query: GetClothingTypes,
      variables: {
        is_hidden: false
      },
      result ({data: { clothingTypes }}) {
        for (const type of clothingTypes) {
          this.form.clothing_types.push({
            key: type.key,
            value: 'R$ ',
            quantity: ''
          })
        }

        this.queriesLoading--
      }
    }
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
      queriesLoading: NUMBER_OF_QUERIES,
      clothingTypes: [],
      form: new Form({
        name: '',
        code: '',
        client_id: '',
        discount: 'R$ ',
        down_payment: 'R$ ',
        shipping_value: 'R$ ',
        payment_via_id: '',
        seam_date: '',
        print_date: '',
        delivery_date: '',
        clothing_types: [],
        art_paths: [],
        size_paths: [],
        payment_voucher_paths: []
      })
    }
  },
  watch: {
    queriesLoading (value) {
      if (!value && this.isEdit) {
        this.populateForm()
      }
    }
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
          },
          refetchQueries: [GetDailyCashDetailedFlow, GetDailyCashBalance]
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
          },
          refetchQueries: [GetDailyCashDetailedFlow, GetDailyCashBalance]
        })

        this.$helpers.clearCacheFrom([
          { id: clientKey, __typename: 'Client' },
          { fieldName: 'orders' }
        ])

        this.$emit('success', { orderId: id, clientId: clientKey })
      } catch (error) {
        handleError(this, error)
      }
    },
    populateForm () {
      const order = this.order
      const fields = pick(order, [
        'client',
        'name',
        'price',
        'code',
        'discount',
        'shipping_value',
        'seam_date',
        'print_date',
        'delivery_date',
        'art_paths',
        'size_paths',
        'payment_voucher_paths'
      ])

      fields.client_id = fields.client

      fields.discount = +fields.discount === 0
        ? 'R$ '
        : this.$helpers.toBRL(fields.discount)

      fields.shipping_value = +fields.shipping_value === 0
        ? 'R$ '
        : this.$helpers.toBRL(fields.shipping_value)

      fields.price = this.$helpers.toBRL(fields.price)
      fields.seam_date = formatDatetime(fields.seam_date)
      fields.print_date = formatDatetime(fields.print_date)
      fields.delivery_date = formatDatetime(fields.delivery_date)

      for (const field in fields) {
        this.form[field] = fields[field]
      }

      this.populateClothingTypes(order.clothing_types)
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
      v-if="isEdit"
      :form="form"
    />

    <OrderFormBasicInfo
      :form="form"
      class="mb-3"
    />

    <OrderFormValues
      v-bind="{order, form, isEdit, isOrderPreRegistered, clothingTypes}"
      class="mb-3"
    />

    <OrderFormDates
      :form="form"
      class="mb-3"
    />

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
        :block="$isMobile"
      >
        {{ isEdit ? 'Atualizar' : 'Cadastrar' }}
      </AppButton>
    </div>
  </AppForm>
</template>
