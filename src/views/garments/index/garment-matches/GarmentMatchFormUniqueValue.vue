<script>
export default {
  props: {
    form: {
      type: Object,
      required: true
    },
    match: {
      type: Object,
      default: () => ({})
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if (this.isEdit) {
      this.populateForm()
    }
  },
  methods: {
    populateForm() {
      this.form.set({
        unique_value: this.$helpers.toBRL(this.match.unique_value)
      })
    }
  }
}
</script>

<template>
  <div>
    <AppInput
      id="unique_value"
      :value="form.unique_value"
      name="unique_value"
      hint="Cada unidade terá este valor, independente da quantidade por pedido."
      :error="form.errors.get('unique_value')"
      @input="form.set({
        unique_value: $event
      })"
    >
      Valor da unidade
    </AppInput>
  </div>
</template>
