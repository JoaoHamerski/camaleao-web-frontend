<script>

import Form from '@/utils/Form'
import { formatDatetime } from '@/utils/formatters'
import { map, pick, cloneDeep, uniqueId, omit, isEmpty, times } from 'lodash-es'
import { CreateOrder, UpdateOrder } from '@/graphql/Order.gql'
import { handleError } from '@/utils/forms'
import { GetClothingTypes } from '@/graphql/ClothingType.gql'
import { GetGarmentMatches } from '@/graphql/GarmentMatch.gql'

import OrderFormClient from './OrderFormClient.vue'
import OrderFormBasicInfo from './OrderFormBasicInfo.vue'
import OrderFormDates from './OrderFormDates.vue'
import OrderFormFiles from './OrderFormFiles.vue'
import FormGarments from './form-garments/FormGarments.vue'
import OrderFormValuesFinalWrapper from './OrderFormValuesFinalWrapper.vue'
import GarmentMatchFormSizes from '@/views/garments/index/garment-matches/GarmentMatchFormSizes.vue'

const OrderFormClothingTypes = () => import('./OrderFormClothingTypes.vue')

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
  match_id: '',
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
      },
      skip () {
        return this.skipClothingTypesQuery
      }
    },
    garmentMatches: {
      query: GetGarmentMatches,
      fetchPolicy: 'no-cache',
      variables () {
        if (this.isEdit) {
          return {
            order_id: this.order.id
          }
        }
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
      clothingTypes: [],
      garmentMatches: ['empty'],
      form: new Form({
        name: '',
        code: '',
        client_id: '',
        discount: 'R$ ',
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
    }
  },
  computed: {
    computedGarmentMatches () {
      if (this.garmentMatches[0] === 'empty') {
        return []
      }

      return this.garmentMatches
    },
    isEdit () {
      return !isEmpty(this.order)
    },
    hasClothingTypes () {
      if (!this.isEdit) {
        return false
      }

      return !!this.order.clothing_types.length
    },
    skipClothingTypesQuery () {
      return !this.hasClothingTypes
    },
    isQueriesLoading () {
      return this.$apollo.loading || this.garmentMatches[0] === 'empty'
    }
  },
  watch: {
    isQueriesLoading (value) {
      if (!value && this.isEdit) {
        this.populateForm()
      }
    }
  },
  methods: {
    getFile (item) {
      return item.base64 || item
    },
    getFormattedGarments () {
      return this.form.garments.map(garment => ({
        ...omit(garment, [
          'id', 'total'
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
    getPopulatedSizes(garment, isIndividual) {
      if (!isIndividual) {
        return garment.sizes.map((size) => ({
          size_id: size.id,
          quantity: size.pivot.quantity
        }))
      }

      return garment.individual_names.map((size) => ({
        size_id: size.size_id,
        name: size.name || '',
        number: size.number || ''
      }))
    },
    populateSizes(garment, index) {
      const prop = garment.individual_names ? 'items_individual' : 'items'

      this.form.set({
        [`garments.${index}.${prop}`]: this.getPopulatedSizes(garment, !!garment.individual_names)
      })
    },
    populateGarments () {
      const garments = this.order.garments

      times(garments.length - 1, () => {
        this.onNewGarment()
      })

      this.form.garments.forEach((garmentForm, index) => {
        const garment = garments[index]
        const { model, material, neck_type, sleeve_type } = garment.match

        Object.assign(garmentForm, {
          model_id: model?.id || '',
          material_id: material?.id || '',
          neck_type_id: neck_type?.id || '',
          sleeve_type_id: sleeve_type?.id || '',
          individual_names: !!garment.individual_names
        })

        this.$nextTick(() => {
          this.populateSizes(garment, index)
        })
      })
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

      if (this.order.clothing_types.length) {
        this.populateClothingTypes(this.order.clothing_types)
      } else {
        this.populateGarments()
      }
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
    onNewGarment () {
      this.form.garments.push({...cloneDeep(DEFAULT_GARMENT), id: uniqueId()})
    },
    onDuplicateGarment(garment) {
      this.onNewGarment()

      const lastGarmentIndex = this.form.garments.length - 1

      Object.assign(this.form.garments[lastGarmentIndex], {...garment, id: uniqueId()})

      this.$nextTick(() => {
        const items_individual = garment.items_individual.map(({size_id, name, number}) => ({
          name, size_id, number
        }))

        const items = garment.items.map(({size_id, quantity}) => ({
          size_id, quantity
        }))

        this.form.garments[lastGarmentIndex].items_individual = items_individual
        this.form.garments[lastGarmentIndex].items = items
      })
    },
    onDeleteGarment (garment) {
      const indexToDelete = this.form.garments.findIndex(({ id }) => id === garment.id)

      this.form.garments.splice(indexToDelete, 1)
    },
    onNewGarmentSize ({isIndividual, garmentIndex}) {
      const prop = isIndividual ? 'items_individual' : 'items'
      const garmentItem = isIndividual ? DEFAULT_GARMENT_INDIVIDUAL_ITEM : DEFAULT_GARMENT_ITEM

      this.form.garments[garmentIndex][prop].push({...garmentItem})
    },
    onDeleteGarmentSize({isIndividual, index, garmentIndex}) {
      const prop = isIndividual ? 'items_individual' : 'items'

      this.form.garments[garmentIndex][prop].splice(index, 1)
    }
  }
}
</script>

<template>
  <div
    v-if="isQueriesLoading"
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
        v-bind="{form, order, isEdit, garmentMatches: computedGarmentMatches}"
        class="mb-3"
        @new-garment="onNewGarment"
        @duplicate-garment="onDuplicateGarment"
        @delete-garment="onDeleteGarment"
        @new-garment-size="onNewGarmentSize"
        @delete-garment-size="onDeleteGarmentSize"
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
