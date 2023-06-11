<script>

import Form from '@/utils/Form'
import Vue from 'vue'
import { formatDatetime } from '@/utils/formatters'
import { map, pick, cloneDeep, uniqueId, omit } from 'lodash-es'
import { CreateOrder, UpdateOrder } from '@/graphql/Order.gql'
import { handleError } from '@/utils/forms'
import { GetDailyCashDetailedFlow, GetDailyCashBalance } from '@/graphql/DailyCash.gql'
import { GetClothingTypes } from '@/graphql/ClothingType.gql'

import OrderFormClient from './OrderFormClient.vue'
import OrderFormBasicInfo from './OrderFormBasicInfo.vue'
import OrderFormDates from './OrderFormDates.vue'
import OrderFormFiles from './OrderFormFiles.vue'
import FormClothes from './form-clothes/FormClothes.vue'
import OrderFormValuesFinalWrapper from './OrderFormValuesFinalWrapper.vue'

const OrderFormClothingTypes = () => import('./OrderFormClothingTypes.vue')

const NUMBER_OF_QUERIES = 1

export const DEFAULT_CLOTH_INDIVIDUAL_ITEM = {
  name: '', size_id: '', number: ''
}

export const DEFAULT_CLOTH_ITEM = {
   size_id: '', quantity: '',
}

export const DEFAULT_CLOTH = {
  id: uniqueId(),
  open: true,
  individual_names: false,
  model_id: '',
  material_id: '',
  neck_type_id: '',
  sleeve_type_id: '',
  items: [{ ...DEFAULT_CLOTH_ITEM }],
  items_individual: [{ ...DEFAULT_CLOTH_INDIVIDUAL_ITEM }],
  match: null,
  total: ''
}

export const form = Vue.observable(new Form({
  name: '',
  code: '',
  client_id: '',
  discount: 'R$ ',
  down_payment: 'R$ ',
  shipping_value: 'R$ ',
  payment_via_id: '',
  delivery_date: '',
  clothing_types: [],
  art_paths: [],
  size_paths: [],
  payment_voucher_paths: [],
  clothes: [{...cloneDeep(DEFAULT_CLOTH)}],
}))

export default {
  components: {
    OrderFormClient,
    OrderFormBasicInfo,
    OrderFormClothingTypes,
    OrderFormDates,
    OrderFormFiles,
    FormClothes,
    OrderFormValuesFinalWrapper
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
      form,
    }
  },
  computed: {
    hasClothingTypes () {
      if (!this.isEdit) {
        return false
      }

      return !!this.order.clothing_types.length
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
    getFormattedClothes () {
      return this.form.clothes.map(cloth => ({
        ...omit(cloth, [
          'id', 'open', 'total', 'match'
        ])
      }))
    },
    getFormattedForm () {
      const form = { ...this.form.data() }

      form.client_id = form.client_id?.id || ''
      form.art_paths = map(form.art_paths, this.getFile)
      form.size_paths = map(form.size_paths, this.getFile)
      form.payment_voucher_paths = map(form.payment_voucher_paths, this.getFile)
      form.clothes = this.getFormattedClothes()

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
      const input = this.getFormattedForm()
      const { clientKey } = this.$route.params

      console.log(input)
      return
      // eslint-disable-next-line
      try {
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
      fields.delivery_date = formatDatetime(fields.delivery_date)

      for (const field in fields) {
        this.form[field] = fields[field]
      }

      if (order.clothing_types.length) {
        this.populateClothingTypes(order.clothing_types)
      }
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

    <FormClothes
      :form="form"
      class="mb-3"
    />

    <OrderFormValuesFinalWrapper
      v-if="!hasClothingTypes"
      :form="form"
      class="mb-3"
    />

    <OrderFormClothingTypes
      v-else
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
