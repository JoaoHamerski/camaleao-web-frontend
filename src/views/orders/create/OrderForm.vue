<script>
import Form from '@/utils/Form'
import { handleError, handleSuccess } from '@/utils/forms'

import OrderFormBasicInfo from './OrderFormBasicInfo'
import OrderFormValues from './OrderFormValues'
import OrderFormProduction from './OrderFormProduction'
import OrderFormFiles from './OrderFormFiles'

const ENDPOINTS = {
  orders: {
    post (clientKey) {
      return `/api/clients/${clientKey}/new-order`
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
        params: {
          ...this.form.data()
        },
        on: {
          error ({ error }) {
            handleError(this, error)
          },
          success () {
            handleSuccess(this)
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
  methods: {
    async update () {

    },
    async store () {
      try {
        await this.$chimera._newOrder.fetch()
      } catch (error) {}
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
      for (const type of clothingTypes) {
        this.$set(this.form, `value_${type.key}`, 'R$ ')
        this.$set(this.form, `quantity_${type.key}`, '')
        this.$set(this.form.originalData, `value_${type.key}`, 'R$ ')
        this.$set(this.form.originalData, `quantity_${type.key}`, '')
      }
    },
    onAttachFile ({ files, field }) {
      this.form[field].push(...files)
    },
    onDeleteFile ({ fileKey, field }) {
      const index = this.form[field].findIndex(
        file => file.key === fileKey
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
      @clothing-types-loaded="onClothingTypesLoaded"
    />
    <OrderFormProduction :form="form" />
    <OrderFormFiles
      :form="form"
      @attach-files="onAttachFile"
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
