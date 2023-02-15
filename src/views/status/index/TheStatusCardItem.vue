<script>
import { faEdit, faTrashAlt, faBars } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    reorder: {
      type: Boolean,
      default: false
    },
    status: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      icons: {
        faEdit,
        faTrashAlt,
        faBars
      }
    }
  },
  computed: {
    defaultStatusOnOrderRegister () {
      if (this.status.id === 22) {
        return '(Padrão após cadastro de pedido)'
      }

      return false
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
    <div class="d-flex">
      <div class="draggable-handler">
        <FontAwesomeIcon
          v-if="reorder"
          class="me-2"
          :icon="icons.faBars"
          fixed-width
        />
      </div>
      <span
        :class="{
          'fw-bold text-success': status.is_available
        }"
      >{{ status.text }}
        <small
          v-show="defaultStatusOnOrderRegister"
          class="text-secondary"
        >{{ defaultStatusOnOrderRegister }}</small></span>
    </div>
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
