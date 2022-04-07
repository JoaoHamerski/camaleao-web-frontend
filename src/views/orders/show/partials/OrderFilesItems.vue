<script>
export default {
  props: {
    order: {
      type: Object,
      required: true
    },
    filesMap: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div>
    <template v-for="(label, key) in filesMap">
      <div
        :key="`order_label_${filesMap[key]}`"
        class="text-subtitle fw-bold text-secondary mb-1"
      >
        {{ label }}
      </div>

      <AppViewerItems
        v-if="order[key]"
        :key="`order_files_${filesMap[key]}`"
        class="mb-3"
        :alt="label"
        :files="order[key]"
      />

      <div
        v-else
        :key="`order_files_empty_${filesMap[key]}`"
      >
        <div class="text-center text-secondary py-5">
          Nenhum anexo registrado
        </div>
      </div>
    </template>
  </div>
</template>
