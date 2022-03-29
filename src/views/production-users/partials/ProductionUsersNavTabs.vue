<script>

import { OPTIONS } from '../index/TheProductionUsers'

export default {
  data () {
    return {
      value: OPTIONS.ALL,
      OPTIONS
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
      :class="{'active fw-bold': value === OPTIONS.ALL}"
      aria-current="page"
      href="#"
      @click.prevent="onTabClick(OPTIONS.ALL)"
    >TODOS</a>

    <a
      class="flex-sm-fill text-sm-center nav-link"
      :class="{'active fw-bold': value === OPTIONS.CONFIRMED}"
      href="#"
      @click.prevent="onTabClick(OPTIONS.CONFIRMED)"
    >CONFIRMADOS</a>
    <a
      class="flex-sm-fill text-sm-center nav-link"
      :class="{'active fw-bold': value === OPTIONS.PENDING}"
      href="#"
      @click.prevent="onTabClick(OPTIONS.PENDING)"
    >PENDENTES</a>
  </nav>
</template>
