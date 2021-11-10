<script>
import Form from '@/utils/Form'

export default {
  props: {
    form: {
      type: Form,
      required: true
    },
    onSubmit: {
      type: Function,
      required: true
    }
  },
  methods: {
    clearError ({ target }) {
      this.form.errors.clear(target.name)
    }
  }
}
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    @keypress.enter.prevent="onSubmit"
    @focus.capture="clearError"
  >
    <slot />
  </form>
</template>
