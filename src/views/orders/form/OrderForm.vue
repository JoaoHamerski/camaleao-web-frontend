<script>

import Form from '@/utils/Form'
import { formatDate } from '@/utils/formatters'
import { handleError, handleSuccess } from '@/utils/forms'
import { map, pick } from 'lodash-es'

import OrderFormBasicInfo from './OrderFormBasicInfo'
import OrderFormValues from './OrderFormValues'
import OrderFormProduction from './OrderFormProduction'
import OrderFormFiles from './OrderFormFiles'

const ENDPOINTS = {
  orders: {
    post (clientKey) {
      return `/api/clients/${clientKey}/new-order`
    },
    patch (clientKey, orderKey) {
      return `/api/clients/${clientKey}/orders/${orderKey}`
    }
  }
}

export default {
  components: {
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
    redirectToClient: {
      type: Function,
      default: () => {}
    }
  },
  chimera: {
    _newOrder () {
      return {
        url: ENDPOINTS.orders.post(this.clientKey),
        method: 'POST',
        on: {
          success ({ data }) {
            handleSuccess(this)
          },
          error ({ error }) {
            handleError(this, error)
          }
        }
      }
    },
    _updateOrder () {
      return {
        url: ENDPOINTS.orders.patch(this.clientKey, this.orderKey),
        method: 'PATCH',
        on: {
          success (response) {
            this.$emit('success', { orderKey: this.form.code })
          },
          error ({ error }) {
            handleError(this, error)
          }
        }
      }
    }
  },
  data () {
    return {
      isLoading: false,
      form: new Form({
        name: '',
        code: '',
        discount: '',
        down_payment: '',
        payment_via_id: '',
        production_date: '',
        delivery_date: '',
        art_paths: [],
        size_paths: [],
        payment_voucher_paths: []
      })
    }
  },
  computed: {
    clientKey () {
      return this.$route.params.clientKey
    },
    orderKey () {
      return this.$route.params.orderKey
    }
  },
  watch: {
    order (val) {
      if (val) {
        this.populateForm()
      }
    }
  },
  methods: {
    getFomattedForm () {
      const form = { ...this.form.data() }
      const getFile = (item) => {
        return item.base64 || item
      }

      form.art_paths = map(form.art_paths, getFile)
      form.size_paths = map(form.size_paths, getFile)
      form.payment_voucher_paths = map(form.payment_voucher_paths, getFile)

      return form
    },
    async update () {
      const form = this.getFomattedForm()

      try {
        await this.$chimera._updateOrder.fetch(true, {
          params: {
            ...form
          }
        })
      } catch (error) {}
    },
    async store () {
      const form = this.getFomattedForm()

      try {
        await this.$chimera._newOrder.fetch(true, {
          params: {
            ...form
          }
        })
      } catch (error) {}
    },
    populateClothingTypes (clothingTypes) {
      for (const type of clothingTypes) {
        this.form[`value_${type.key}`] = this.$helpers.toBRL(type.value)
        this.form[`quantity_${type.key}`] = type.quantity
      }
    },
    populateForm () {
      const fields = pick(this.order, [
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

      fields.discount = this.$helpers.toBRL(fields.discount)
      fields.price = this.$helpers.toBRL(fields.price)
      fields.production_date = formatDate(fields.production_date)
      fields.delivery_date = formatDate(fields.delivery_date)

      for (const field in fields) {
        this.form[field] = fields[field]
      }
    },
    async onSubmit () {
      this.isLoading = true

      if (this.isEdit) {
        await this.update()
      } else {
        await this.store()
      }

      this.isLoading = false
    },
    onClothingTypesLoaded (clothingTypes) {
      this.$emit('clothing-types-loaded')

      for (const type of clothingTypes) {
        this.$set(this.form, `value_${type.key}`, 'R$ ')
        this.$set(this.form, `quantity_${type.key}`, '')
        this.$set(this.form.originalData, `value_${type.key}`, 'R$ ')
        this.$set(this.form.originalData, `quantity_${type.key}`, '')
      }

      if (this.isEdit) {
        this.populateClothingTypes(this.order.clothing_types)
      }
    },
    onAttachFiles ({ files, field }) {
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
    <OrderFormBasicInfo :form="form" />
    <OrderFormValues
      :form="form"
      :is-edit="isEdit"
      @clothing-types-loaded="onClothingTypesLoaded"
    />
    <OrderFormProduction :form="form" />
    <OrderFormFiles
      :is-edit="isEdit"
      :form="form"
      @attach-files="onAttachFiles"
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
