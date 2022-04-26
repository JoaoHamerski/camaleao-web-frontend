<script>
import TheTestModal from './TheTestModal.vue'

/**
 * @file
 *
 * Arquivo para teste de componentes.
 * Acessado em /testes
 */
export default {
  components: {
    TheTestModal
  },
  data () {
    return {
      modal: false
    }
  },
  mounted () {
    this.$store.commit('SET_BOOTED', true)
  },
  methods: {
    openModal () {
      this.modal = true
    }
  }
}
</script>

<template>
  <div class="p-5">
    <AppButton @click="openModal">
      Open modal
    </AppButton>

    <TheTestModal v-model="modal" />
  </div>
</template>
