<script>
import { faCity, faBoxes, faTshirt } from '@fortawesome/free-solid-svg-icons';
import SalesAmountCitiesRemainingListItem from './SalesAmountCitiesRemainingListItem.vue';

const MAX_ITEMS_NOT_COLLAPSED = 5;

export default {
  components: {
    SalesAmountCitiesRemainingListItem
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    collapse: true,
    icons: {
      faCity,
      faBoxes,
      faTshirt
    }
  }),
  computed: {
    computedItems () {
      if (this.collapse) {
        return [...this.items].splice(0, MAX_ITEMS_NOT_COLLAPSED)
      }

      return this.items
    }
  },
  methods: {
    toggleCollapse () {
      this.collapse = !this.collapse
    }
  }
}
</script>

<template>
  <div>
    <div
      class="small link-primary clickable"
      @click.prevent="toggleCollapse"
    >
      {{ collapse ? 'Ver tudo' : 'Ver menos' }}
      <span v-show="collapse">
        ({{ items.length }})
      </span>
    </div>

    <ul
      class="list-group list-group-horizontal list-group-sm"
    >
      <SalesAmountCitiesRemainingListItem
        v-for="item in computedItems"
        :key="`city_${item.city.id}`"
        :item="item"
      />
    </ul>
  </div>
</template>

<style scoped lang="scss">
  @import "@/sass/_bootstrap-utilities";

  .list-group {
    display: grid;
    .list-group-item {
      border: 1px solid rgba(0, 0, 0, .15);
      border-collapse: collapse;
    }
  }

  .list-group {
    grid-template-columns: repeat(2, 1fr);
  }

  @include media-breakpoint-up(md) {
    .list-group {
      grid-template-columns: repeat(5, 1fr);
    }
  }


</style>
