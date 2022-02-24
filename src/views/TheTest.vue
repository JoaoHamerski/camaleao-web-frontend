<script>
export default {
  data () {
    return {
      date: ''
    }
  }
}
</script>

<template>
  <div>
    <AppInput
      v-model="date"
      type="week"
      name="algo"
    />

    {{ date }}
  </div>
</template>
