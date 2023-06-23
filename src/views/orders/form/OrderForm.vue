<script>

import Form from '@/utils/Form'
import { formatDatetime } from '@/utils/formatters'
import { map, pick, cloneDeep, uniqueId, omit, isEmpty } from 'lodash-es'
import { CreateOrder, UpdateOrder } from '@/graphql/Order.gql'
import { handleError } from '@/utils/forms'
import { GetClothingTypes } from '@/graphql/ClothingType.gql'

import OrderFormClient from './OrderFormClient.vue'
import OrderFormBasicInfo from './OrderFormBasicInfo.vue'
import OrderFormDates from './OrderFormDates.vue'
import OrderFormFiles from './OrderFormFiles.vue'
import FormGarments from './form-garments/FormGarments.vue'
import OrderFormValuesFinalWrapper from './OrderFormValuesFinalWrapper.vue'

const OrderFormClothingTypes = () => import('./OrderFormClothingTypes.vue')

const NUMBER_OF_QUERIES = 1

export const DEFAULT_GARMENT_INDIVIDUAL_ITEM = {
  name: '', size_id: '', number: ''
}

export const DEFAULT_GARMENT_ITEM = {
   size_id: '', quantity: '',
}

export const DEFAULT_GARMENT = {
  id: uniqueId(),
  individual_names: false,
  model_id: '',
  material_id: '',
  neck_type_id: '',
  sleeve_type_id: '',
  items: [{ ...DEFAULT_GARMENT_ITEM }],
  items_individual: [{ ...DEFAULT_GARMENT_INDIVIDUAL_ITEM }],
  match: null,
  total: ''
}

export default {
  components: {
    OrderFormClient,
    OrderFormBasicInfo,
    OrderFormClothingTypes,
    OrderFormDates,
    OrderFormFiles,
    OrderFormValuesFinalWrapper,
    FormGarments,
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
      form: new Form({
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
        garments: [{...cloneDeep(DEFAULT_GARMENT)}],
      }),
      isLoading: false,
      queriesLoading: NUMBER_OF_QUERIES,
      clothingTypes: [],
    }
  },
  computed: {
    isEdit () {
      return !isEmpty(this.order)
    },
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
    onNewGarment () {
      this.form.garments.push({
        ...cloneDeep(DEFAULT_GARMENT),
        id: uniqueId()
      })
    },
    onNewGarmentSize ({ garmentIndex, isIndividual }) {
      if (isIndividual) {
        this.form.garments[garmentIndex].items_individual.push({...DEFAULT_GARMENT_INDIVIDUAL_ITEM})
        return
      }

      this.form.garments[garmentIndex].items.push({...DEFAULT_GARMENT_ITEM})
    },
    onDeleteGarmentSize({ garmentIndex, index, isIndividual}) {
      if (isIndividual) {
        this.form.garments[garmentIndex].items_individual.splice(index, 1)
        return
      }

      this.form.garments[garmentIndex].items.splice(index, 1)
    },
    onDuplicateGarment ({indexToClone}) {
      const duplicate = cloneDeep(this.form.garments[indexToClone])
      const newIndex = this.form.garments.length

      this.onNewGarment()

      this.$nextTick(() => {
        Object.assign(this.form.garments[newIndex], omit(duplicate, ['id']))
      })
    },
    onDeleteGarment({indexToDelete}) {
      this.form.garments.splice(indexToDelete, 1)
    },
    getFile (item) {
      return item.base64 || item
    },
    getFormattedGarments () {
      return this.form.garments.map(garment => ({
        ...omit(garment, [
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
      form.garments = this.getFormattedGarments()

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
      const input = this.getFormattedForm()
      const { clientKey } = this.$route.params

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
  <div
    v-if="queriesLoading"
    class="text-center my-5"
  >
    <div
      class="spinner-grow text-primary"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <AppForm
    v-else
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

    <template v-if="!hasClothingTypes">
      <FormGarments
        v-if="!hasClothingTypes"
        :form="form"
        :order="order"
        :is-edit="isEdit"
        class="mb-3"
        @new-garment="onNewGarment"
        @new-garment-size="onNewGarmentSize"
        @delete-garment-size="onDeleteGarmentSize"
        @duplicate-garment="onDuplicateGarment"
        @delete-garment="onDeleteGarment"
      />

      <OrderFormValuesFinalWrapper
        v-if="!hasClothingTypes"
        :form="form"
        class="mb-3"
      />
    </template>

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
