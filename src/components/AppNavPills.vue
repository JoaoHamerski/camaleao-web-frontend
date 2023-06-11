<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    items: {
      type: Array,
      required: true
    },
    errors: {
      type: Array,
      default: () => []
    },
    noFill: {
      type: Boolean,
      default: false
    },
    tabsStyle: {
      type: Boolean,
      default: false
    },
    headerClass: {
      type: String,
      default: ''
    }
  },
  methods: {
    onNavClick (item, index) {
      this.$emit('input', index)
      this.$emit('nav-selected', item.value)
    },
    itemHasError(item) {
      if (!this.errors.length) {
        return
      }

      return item.fields.some(field => this.errors.includes(field))
    }
  }
}
</script>

<template>
  <div>
    <ul
      id="pills-tab"
      class="nav flex-sm-row mb-3"
      :class="[{
        'nav-fill': !noFill,
      }, tabsStyle ? 'nav-tabs' : 'nav-pills']"
      role="tablist"
    >
      <li
        v-for="(item, index) in items"
        :key="item.value"
        class="nav-item"
        :class="[{
          'has-error': itemHasError(item)
        }, headerClass]"
        :role="item.value"
      >
        <button
          :id="`pills-${item.value}-tab`"
          class="nav-link"
          :class="value === index && 'active'"
          data-bs-toggle="pill"
          :data-bs-target="`#pills-${item.value}`"
          type="button"
          role="tab"
          :aria-controls="`pills-${item.value}`"
          :aria-selected="value === index"
          @click.prevent="onNavClick(item, index)"
        >
          <template
            v-if="$scopedSlots[`headers.${item.value}`]"
          >
            <slot
              :name="`headers.${item.value}`"
              :item="item"
            />
          </template>
          <template v-else>
            {{ item.text }}
          </template>
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
        :class="value === index && 'show active'"
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
