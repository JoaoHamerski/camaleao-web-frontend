<script>
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default {
  data () {
    return {
      icons: {
        faEdit,
        faTrashAlt
      }
    }
  },
  methods: {
    onEditClick () {
      this.$emit('edit-client')
    }
  }
}
</script>

<template>
  <div class="text-subtitle">
    <div class="mb-1">
      <span
        class="link-primary clickable text-decoration-none"
        @click.prevent="onEditClick"
      >
        <FontAwesomeIcon
          :icon="icons.faEdit"
          fixed-width
        />
        Editar dados
      </span>
    </div>
    <div>
      <span class="link-danger clickable">
        <FontAwesomeIcon
          :icon="icons.faTrashAlt"
          fixed-width
        />
        Excluir cliente
      </span>
    </div>
  </div>
</template>
