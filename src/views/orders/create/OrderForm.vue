<script>
import Form from '@/utils/Form'

import OrderFormBasicInfo from './OrderFormBasicInfo'
import OrderFormValues from './OrderFormValues'
import OrderFormProduction from './OrderFormProduction'
import OrderFormFiles from './OrderFormFiles'

export default {
  components: {
    OrderFormBasicInfo,
    OrderFormValues,
    OrderFormProduction,
    OrderFormFiles
  },
  props: {
    redirectToClient: {
      type: Function,
      default: () => {}
    }
  },
  chimera: {
    _newOrder () {
      return {
        url: `/api/clients/${this.$route.params.client}/new-order`,
        method: 'POST',
        params: {
          ...this.form.data()
        },
        on: {
          error ({ error }) {
            console.log(error)
            this.$toast.error('Algo está incorreto, verifique os dados, por favor.', {
              duration: 4000
            })

            if (error.errors) {
              this.form.onFail(error.errors)
            }

            this.isLoading = false
          },
          success () {
            this.form.reset()
            this.isLoading = false
            this.$emit('submitted')
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
  methods: {
    onSubmit () {
      this.isLoading = true
      this.$chimera._newOrder.fetch()
    },
    onClothingTypesLoaded (clothingTypes) {
      for (const type of clothingTypes) {
        this.$set(this.form, `value_${type.key}`, '')
        this.$set(this.form, `quantity_${type.key}`, '')
        this.$set(this.form.originalData, `value_${type.key}`, '')
        this.$set(this.form.originalData, `quantity_${type.key}`, '')
      }
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
    <OrderFormFiles :form="form" />

    <div class="mt-3">
      <AppButton
        type="submit"
        :loading="isLoading"
        color="success"
        class="fw-bold"
      >
        Cadastrar
      </AppButton>
    </div>
  </AppForm>
</template>
