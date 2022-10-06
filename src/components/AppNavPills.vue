<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    errors: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    itemHasError(item) {
      return item.fields.some(field => this.errors.includes(field))
    }
  }
}
</script>

<template>
  <div>
    <ul
      id="pills-tab"
      class="nav nav-pills nav-fill flex-sm-row mb-3"
      role="tablist"
    >
      <li
        v-for="(item, index) in items"
        :key="item.value"
        class="nav-item"
        :class="itemHasError(item) && 'has-error'"
        :role="item.value"
      >
        <button
          :id="`pills-${item.value}-tab`"
          class="nav-link"
          :class="index === 0 && 'active'"
          data-bs-toggle="pill"
          :data-bs-target="`#pills-${item.value}`"
          type="button"
          role="tab"
          :aria-controls="`pills-${item.value}`"
          :aria-selected="index === 0 && true"
        >
          {{ item.text }}
        </button>
      </li>
    </ul>
    <div
      id="pills-tabContent"
      class="tab-content"
    >
      <div
        v-for="(item, index) in items"
        :id="`pills-${item.value}`"
        :key="item.value"
        class="tab-pane"
        :class="index === 0 && 'show active'"
        role="tabpanel"
        :aria-labelledby="`pills-${item.value}-tab`"
      >
        <slot :name="item.value" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/sass/_bootstrap-utilities.scss";

.nav-item.has-error {
  .nav-link {
    color: $danger;
  }

  .nav-link.active {
    background-color: $danger;
    color: white;
  }
}

.nav-link.active {
  font-weight: bold;
}
</style>
