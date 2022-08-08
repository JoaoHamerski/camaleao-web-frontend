<script>
import roles from '@/constants/roles'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      roles
    }
  },
  methods: {
    onPendencyOfMonthClick(date) {
      this.$emit('open-pendency-orders', date)
    }
  }
}
</script>

<template>
  <div class="col">
    <div
      class="fw-bold link-primary clickable"
      @click.prevent="onPendencyOfMonthClick(item.date)"
    >
      {{
        $helpers.canView(roles.GERENCIA)
          ? 'PENDÊNCIA NO MÊS'
          : 'VER PENDÊNCIAS DESSE MÊS'
      }}
    </div>
    <h2
      v-if="$helpers.canView(roles.GERENCIA)"
      class="fw-bold text-danger"
    >
      {{ $helpers.toBRL(item.pendency) }}
    </h2>
  </div>
</template>
