<script>

import Form from '@/utils/Form'
import { formatDatetime } from '@/utils/formatters'
import { map, pick, isEmpty, uniqueId } from 'lodash-es'
import { CreateOrder, UpdateOrder } from '@/graphql/Order.gql'
import { handleError } from '@/utils/forms'
import { faBoxOpen, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'

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
      icons: {
        faBoxOpen,
        faHandHoldingUsd
      },
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
        product_items: [{ ...PRODUCT_ITEM}],
        direct_cost_items: [{ ...PRODUCT_ITEM}]
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
      form.direct_cost_items = map(form.direct_cost_items, product => pick(product, [
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
    mapProductItems (product, index) {
      return {
        id: product.id,
        item: index + 1,
        description: product.description,
        quantity: product.quantity.toString(),
        value: this.$helpers.toBRL(Math.abs(product.value)),
        valueRaw: product.value,
        unity: product.unity,
        errors: []
      }
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

      this.form.product_items = this.order.products.map(this.mapProductItems).filter(({ valueRaw }) => valueRaw > 0)
      this.form.direct_cost_items = this.order.products.map(this.mapProductItems).filter(({ valueRaw }) => valueRaw < 0)
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
    onNewProductClick (prop) {
      this.form[prop].push({
        ...PRODUCT_ITEM,
        id: uniqueId('_new'),
        item: this.form[prop].length + 1,
      })
    },
    onDeleteProductClick (productItem, prop) {
      if (this.form[prop].length === 1) {
        return
      }

      const indexToDelete = this.form[prop].findIndex(
        ({id}) => id == productItem.id
      )

      this.form[prop].splice(indexToDelete, 1)

      this.form[prop].forEach((product, index) => {
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
      label="Produtos"
      prop="product_items"
      :icon="icons.faBoxOpen"
      @new-item="onNewProductClick('product_items')"
      @delete-item="onDeleteProductClick($event, 'product_items')"
    />

    <OrderValues
      :form="form"
      class="mb-3"
      label="Custo direto"
      prop="direct_cost_items"
      :icon="icons.faHandHoldingUsd"
      @new-item="onNewProductClick('direct_cost_items')"
      @delete-item="onDeleteProductClick($event, 'direct_cost_items')"
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
