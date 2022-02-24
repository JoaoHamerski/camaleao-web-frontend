<script>
export default {
  data () {
    return {
      value: 'all'
    }
  },
  methods: {
    onTabClick (value) {
      if (value !== this.value) {
        this.value = value
        this.$emit('change', value)
      }
    }
  }
}
</script>

<template>
  <nav class="nav nav-pills flex-column flex-sm-row">
    <a
      class="flex-sm-fill text-sm-center nav-link"
      :class="{'active fw-bold': value === 'all'}"
      aria-current="page"
      href="#"
      @click.prevent="onTabClick('all')"
    >TODOS</a>

    <a
      class="flex-sm-fill text-sm-center nav-link"
      :class="{'active fw-bold': value === 'confirmed'}"
      href="#"
      @click.prevent="onTabClick('confirmed')"
    >CONFIRMADOS</a>
    <a
      class="flex-sm-fill text-sm-center nav-link"
      :class="{'active fw-bold': value === 'pending'}"
      href="#"
      @click.prevent="onTabClick('pending')"
    >PENDENTES</a>
  </nav>
</template>
