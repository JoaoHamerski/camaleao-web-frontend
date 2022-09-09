<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div>
    <div class="fw-bold small mb-2">
      OUTROS SETORES DO USUÁRIO:
    </div>
    <div class="small text-secondary">
      <template v-for="sector in user.sectors">
        <span
          v-if="item.id !== sector.id"
          :key="sector.id"
          class="badge bg-primary mx-1 mb-1"
        >
          {{ sector.name }}
        </span>
      </template>
    </div>
  </div>
</template>
