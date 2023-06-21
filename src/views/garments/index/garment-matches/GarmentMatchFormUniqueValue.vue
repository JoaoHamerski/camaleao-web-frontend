<script>
import { form } from './GarmentMatchForm.vue'

export default {
  props: {
    match: {
      type: Object,
      default: () => ({})
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    form
  }),
  mounted () {
    if (this.isEdit) {
      this.populateForm()
    }
  },
  methods: {
    populateForm() {
      this.form.unique_value = this.$helpers.toBRL(this.match.unique_value)
    }
  }
}
</script>

<template>
  <div>
    <AppInput
      id="unique_value"
      v-model="form.unique_value"
      name="unique_value"
      hint="Cada unidade terá este valor, independente da quantidade por pedido."
      :error="form.errors.get('unique_value')"
    >
      Valor da unidade
    </AppInput>
  </div>
</template>
