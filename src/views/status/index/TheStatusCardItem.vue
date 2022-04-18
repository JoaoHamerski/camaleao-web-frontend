<script>
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    status: {
      type: Object,
      required: true
    }
  },
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
      this.$emit('edit', this.status)
    },
    onDeleteClick () {
      this.$emit('delete', this.status)
    }
  }
}
</script>

<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <span
      :class="{
        'fw-bold text-success': status.is_available
      }"
    >{{ status.text }}</span>
    <div class="d-flex flex-column flex-sm-row ">
      <AppButton
        outlined
        :icon="icons.faEdit"
        btn-class="btn-sm px-3"
        class="me-0 me-sm-2 mb-2 mb-sm-0"
        @click.prevent="onEditClick"
      />
      <AppButton
        outlined
        color="danger"
        :icon="icons.faTrashAlt"
        btn-class="btn-sm px-3"
        @click.prevent="onDeleteClick"
      />
    </div>
  </li>
</template>
