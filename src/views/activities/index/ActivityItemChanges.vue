<script>
import ActivityItemChangesProps from './ActivityItemChangesProps.vue'

export default {
  components: {
    ActivityItemChangesProps
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    propsMap: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      collapse: false
    }
  },
  computed: {
    properties () {
      return JSON.parse(this.item.properties)
    },
    old () {
      return this.properties.old
    },
    updated () {
      return this.properties.attributes
    }
  }
}
</script>

<template>
  <AppCollapsible
    :id="`description_${item.id}`"
    v-model="collapse"
    header-class="link-primary small"
    hide-arrow
  >
    <template #header>
      {{ collapse ? 'Ocultar alterações ' : 'Ver alterações' }}
    </template>

    <template #body>
      <div class="activity-item-changes table-responsive">
        <ActivityItemChangesProps
          :props-old="old"
          :props-updated="updated"
          :map="propsMap"
        />
      </div>
    </template>
  </AppCollapsible>
</template>

<style lang="scss" scoped>
@import "@/sass/variables/_colors";

.activity-item-changes {
  border-left: 2px solid $primary;
  padding-left: 1rem;
}
</style>
