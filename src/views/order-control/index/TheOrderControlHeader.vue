<script>
import { faTasks, faSyncAlt } from '@fortawesome/free-solid-svg-icons'

export default {
  data () {
    return {
      icons: {
        faTasks,
        faSyncAlt
      }
    }
  },
  methods: {
    onRefreshClick () {
      this.$emit('refresh')
    }
  }
}
</script>

<template>
  <div class="card mb-2">
    <div class="card-header d-flex justify-content-between bg-primary text-white fw-bold">
      <div>
        <FontAwesomeIcon
          :icon="icons.faTasks"
          fixed-width
        />
        Controle de Pedidos
      </div>
      <AppButton
        :icon="icons.faSyncAlt"
        color="light"
        btn-class="text-primary btn-sm"
        @click="onRefreshClick"
      />
    </div>
  </div>
</template>
