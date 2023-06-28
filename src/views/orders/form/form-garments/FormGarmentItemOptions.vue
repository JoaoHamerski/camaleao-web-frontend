<script>
import { faPlus, faPaste, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default {
  props: {
    garment: {
      type: Object,
      required: true
    },
    isDeleteGarmentDisabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    icons: {
      faPlus,
      faPaste,
      faTrashAlt
    }
  }),
  methods: {
    onNewClick () {
      this.$emit('new-garment')
    },
    onDuplicateClick () {
      this.$emit('duplicate-garment', {...this.garment})
    },
    onDeleteClick () {
      this.$emit('delete-garment', this.garment)
    }
  }
}
</script>

<template>
  <div class="small">
    <a
      href=""
      class="text-decoration-none"
      @click.prevent="onNewClick"
    >
      <FontAwesomeIcon :icon="icons.faPlus" />
      Novo
    </a>

    <a
      href=""
      class="text-decoration-none mx-3"
      @click.prevent="onDuplicateClick"
    >
      <FontAwesomeIcon :icon="icons.faPaste" />
      Duplicar
    </a>

    <a
      v-if="!isDeleteGarmentDisabled"
      href=""
      class="text-decoration-none"
      @click.prevent="onDeleteClick"
    >
      <FontAwesomeIcon :icon="icons.faTrashAlt" />
      Deletar
    </a>
  </div>
</template>
