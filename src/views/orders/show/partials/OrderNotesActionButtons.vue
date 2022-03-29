<script>
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    deleteNote: {
      type: Object,
      required: true
    },
    note: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      icons: {
        faTrashAlt,
        faEdit
      }
    }
  },
  methods: {
    onEditClick () {
      this.$emit('edit', this.note)
    },
    onDeleteClick () {
      this.$emit('delete', this.note)
    },
    onCancelDeleteClick () {
      this.$emit('cancel-delete')
    },
    onConfirmDeleteClick () {
      this.$emit('confirm-delete')
    }
  }
}
</script>

<template>
  <div
    v-if="deleteNote.note.id === note.id"
    class="d-flex"
  >
    <AppButton
      btn-class="btn-sm fw-bold"
      color="success"
      :loading="deleteNote.isLoading"
      @click.prevent="onConfirmDeleteClick(note)"
    >
      Confirmar
    </AppButton>
    <AppButton
      class="ms-2"
      btn-class="btn-sm"
      color="light"
      :disabled="deleteNote.isLoading"
      @click.prevent="onCancelDeleteClick(note)"
    >
      Cancelar
    </AppButton>
  </div>
  <div
    v-else
    class="d-flex"
  >
    <AppButton
      class="me-3"
      tooltip="Editar"
      btn-class="btn-sm px-4"
      outlined
      :icon="icons.faEdit"
      @click.prevent="onEditClick(note)"
    />
    <AppButton
      color="danger"
      tooltip="Deletar"
      btn-class="btn-sm px-4"
      outlined
      :icon="icons.faTrashAlt"
      @click.prevent="onDeleteClick(note)"
    />
  </div>
</template>
