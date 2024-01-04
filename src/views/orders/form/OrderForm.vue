<script>

import Form from '@/utils/Form'
import { formatDatetime } from '@/utils/formatters'
import { map, pick, isEmpty, uniqueId } from 'lodash-es'
import { CreateOrder, UpdateOrder } from '@/graphql/Order.gql'
import { handleError } from '@/utils/forms'

import OrderFormClient from './OrderFormClient.vue'
import OrderFormBasicInfo from './OrderFormBasicInfo.vue'
import OrderFormDates from './OrderFormDates.vue'
import OrderFormFiles from './OrderFormFiles.vue'
import OrderFormValuesFinalWrapper from './OrderFormValuesFinalWrapper.vue'
import OrderValues from './OrderValues.vue'


const PRODUCT_ITEM = {
  id: uniqueId('new_'),
  item: 1,
  description: '',
  quantity: '',
  unity: 'un',
  value: 'R$ ',
  errors: []
}

export default {
  components: {
    OrderFormClient,
    OrderFormBasicInfo,
    OrderFormDates,
    OrderFormFiles,
    OrderFormValuesFinalWrapper,
    OrderValues
  },
  props: {
    client: {
      type: Object,
      default: () => ({})
    },
    order: {
      type: Object,
      default: () => ({})
    },
    isOrderPreRegistered: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: new Form({
        name: '',
        code: '',
        client_id: '',
        discount: 'R$ ',
        shipping_value: 'R$ ',
        payment_via_id: '',
        delivery_date: '',
        art_paths: [],
        size_paths: [],
        payment_voucher_paths: [],
        recommendation_bonus_percent: '10',
        product_items: [{ ...PRODUCT_ITEM}]
      }),
      isLoading: false,
    }
  },
  computed: {
    isEdit () {
      return !isEmpty(this.order)
    }
  },
  mounted () {
    if (this.isEdit) {
      this.populateForm()
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
      form.product_items = map(form.product_items, product => pick(product, [
        'description', 'quantity', 'value', 'unity'
      ]))

      return form
    },
    async update () {
      const data = this.getFormattedForm()
      const { data: { orderUpdate: { id, client } } } = await this.$apollo.mutate({
        mutation: UpdateOrder,
        variables: {
          id: this.order.id,
          input: { ...data }
        }
      })

      this.$helpers.clearCacheFrom({ fieldName: 'weeklyProduction' })
      this.$emit('success', { orderId: id, clientId: client.id })
    },
    async create () {
      const input = this.getFormattedForm()
      const { clientKey } = this.$route.params
      console.log(input)
      const { data: { orderCreate: { id } } } = await this.$apollo.mutate({
        mutation: CreateOrder,
        variables: {
          client_id: clientKey,
          input
        }
      })

      this.$helpers.clearCacheFrom([
        { id: clientKey, __typename: 'Client' },
        { fieldName: 'orders' }
      ])

      this.$emit('success', { orderId: id, clientId: clientKey })
    },
    populateForm () {
      const fields = pick(this.order, [
        'client',
        'name',
        'price',
        'code',
        'discount',
        'shipping_value',
        'delivery_date',
        'art_paths',
        'size_paths',
        'product_items',
        'payment_voucher_paths'
      ])

      Object.assign(this.form, {
        ...fields,
        client_id: fields.client,
        discount: +fields.discount === 0 ? 'R$ ' : this.$helpers.toBRL(fields.discount),
        shipping_value: +fields.shipping_value === 0 ? 'R$ ' : this.$helpers.toBRL(fields.shipping_value),
        price: this.$helpers.toBRL(fields.price),
        delivery_date: formatDatetime(fields.delivery_date)
      })

      this.form.product_items = this.order.products.map((product, index) => ({
        id: product.id,
        item: index + 1,
        description: product.description,
        quantity: product.quantity.toString(),
        value: this.$helpers.toBRL(product.value),
        unity: product.unity,
        errors: []
      }))
    },
    async onSubmit () {
      this.isLoading = true

      try {
        if (this.isEdit) {
          await this.update()
        } else {
          await this.create()
        }
      } catch (error) {
        this.isLoading = false
        handleError(this, error)
      }
    },

    onSelectFiles ({ files, field }) {
      this.form[field].push(...files)
    },
    onDeleteFile ({ fileKey, field }) {
      const index = this.form[field].findIndex(
        file => file.key === fileKey || file === fileKey
      )

      this.form[field].splice(index, 1)
    },
    onNewProductClick () {
      this.form.product_items.push({
        ...PRODUCT_ITEM,
        id: uniqueId('_new'),
        item: this.form.product_items.length + 1,
      })
    },
    onDeleteProductClick (productItem) {
      if (this.form.product_items.length === 1) {
        return
      }

      const indexToDelete = this.form.product_items.findIndex(
        ({item}) => item === productItem.item
      )

      this.form.product_items.splice(indexToDelete, 1)

      this.form.product_items.forEach((product, index) => {
        product.item = index + 1
      })
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
    <OrderValues
      :form="form"
      class="mb-3"
      @new-item="onNewProductClick"
      @delete-item="onDeleteProductClick"
    />

    <OrderFormValuesFinalWrapper
      :client="client"
      :form="form"
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
