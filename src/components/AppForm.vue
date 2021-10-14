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
  }
}
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    @keypress.enter.prevent="onSubmit"
    @focus.capture="form.errors.clear($event.target.name)"
  >
    <slot />
  </form>
</template>
