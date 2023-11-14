<script>
import 'reflect-metadata'
import nubank from 'nubank-client'
import Form from '@/utils/Form'

export default {
  metaInfo: {
    title: 'Nubank'
  },
  data: () => ({
    qrCodeSrc: '',
    form: new Form({
      login: '',
      password: ''
    }),
    nubankInstance: null
  }),
  async mounted () {
  },
  methods: {
    async authNubank () {
      this.nubankInstance = nubank.createInstance({
        ...this.form.data()
      })

      const qrCode = await this.nubankInstance.generateQRCode()

      this.qrCodeSrc = qrCode
    },
    async onQRCodeRead () {
      await this.nubankInstance.authenticate()

      // const bills = await this.nubankInstance.getBills()

      // console.log(bills)
    }
  }
}
</script>

<template>
  <div>
    <img
      v-if="qrCodeSrc"
      :src="qrCodeSrc"
      alt=""
    >
    <AppInput
      v-model="form.login"
      name="login"
      placeholder="login"
    />
    <AppInput
      v-model="form.password"
      name="password"
      type="password"
      placeholder="password"
    />
    <AppButton @click.prevent="authNubank">
      Enviar
    </AppButton>
    <AppButton @click.prevent="onQRCodeRead">
      Já li o QR Code
    </AppButton>
  </div>
</template>
