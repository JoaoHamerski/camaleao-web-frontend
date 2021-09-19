<script>
export default {
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    hasSlot (name) {
      return this.$slots[name] || this.$scopedSlots[name]
    }
  }
}
</script>

<template>
  <div class="table-responsive">
    <table
      v-if="items.length"
      class="table"
    >
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.value"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="item in items"
          :key="item.id"
        >
          <td
            v-for="header in headers"
            :key="header.value"
          >
            <template v-if="!hasSlot(`items.${header.value}`)">
              {{ item[header.value] }}
            </template>
            <slot
              v-else
              :name="`items.${header.value}`"
              :item="item"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-else
      class="text-center text-secondary mb-3 mt-4"
    >
      Nenhum item para exibir
    </div>
  </div>
</template>
