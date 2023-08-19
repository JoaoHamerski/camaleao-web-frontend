<script>
import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'

export default {
  props: {
    status: {
      type: Object,
      required: true
    }
  },
  computed: {
    getIcon () {
      return this.status.pivot.is_confirmed
        ? faCheck
        : faMinus
    }
  },
  methods: {
    formatDatetime
  }
}
</script>

<template>
  <li
    class="list-group-item d-flex justify-content-between"
  >
    <div
      :class="{
        'text-success': status.pivot.is_confirmed,
        'text-secondary': !status.pivot.is_confirmed
      }"
    >
      <div :class="{'fw-bold': status.pivot.is_confirmed}">
        <FontAwesomeIcon
          :icon="getIcon"
          fixed-width
        />
        {{ status.text }}
      </div>

      <div
        v-if="status.pivot.is_confirmed && status.pivot.user"
        class="small text-secondary"
      >
        {{ status.pivot.user.name }}
      </div>
      <div
        v-else-if="status.pivot.is_confirmed && !status.pivot.user"
        class="small text-secondary"
      >
        [Concluído pelo sistema]
      </div>
    </div>
    <div
      v-if="status.pivot.confirmed_at"
      class="text-secondary small position-relative"
      :class="{
        'text-decoration-line-through': !status.pivot.is_confirmed
      }"
    >
      <span
        v-if="!status.pivot.is_confirmed"
        v-tippy
        style="z-index: 100; left: 0; top: 0; right: 0; bottom: 0;"
        class="position-absolute"
        content="Pedido possivelmente cancelado pelo sistema, devido a alterações nos status gerais, mas sua data de confirmação foi mantida."
      />
      {{ formatDatetime(status.pivot.confirmed_at, 'dd/MM/yy HH:mm:ss') }}
    </div>
  </li>
</template>
