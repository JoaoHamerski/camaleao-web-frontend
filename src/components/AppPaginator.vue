<script>
import {
  faArrowLeft,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    page: {
      type: [String, Number],
      required: true
    },
    pagination: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      icons: {
        faArrowLeft,
        faArrowRight
      }
    }
  },
  methods: {
    paginate (link, isNext) {
      const page = parseInt(this.page)

      if (isNext === undefined) {
        this.$emit('update:page', parseInt(link.label))
        return
      }

      if (!isNext) {
        this.$emit('update:page', page - 1)
        return
      }

      this.$emit('update:page', page + 1)
    },
    isFirstPageItem (index) {
      return index === 0
    },
    isLastPageItem (index) {
      return index === (this.pagination.links.length - 1)
    }
  }
}
</script>

<template>
  <nav aria-label="Paginação">
    <ul class="pagination">
      <li
        v-for="(link, index) in pagination.links"
        :key="index"
        class="page-item"
        :class="{
          'active': link.active,
          'disabled': link.url === null
        }"
      >
        <template v-if="isFirstPageItem(index)">
          <a
            class="page-link clickable"
            @click="paginate(link, false)"
          >
            <FontAwesomeIcon
              class="fa-fw px-1"
              :icon="icons.faArrowLeft"
            />
          </a>
        </template>

        <template v-if="!isFirstPageItem(index) && !isLastPageItem(index)">
          <a
            class="page-link clickable"
            @click="paginate(link)"
          >
            {{ link.label }}
          </a>
        </template>

        <template v-if="isLastPageItem(index)">
          <a
            class="page-link clickable"
            @click="paginate(link, true)"
          >
            <FontAwesomeIcon
              class="fa-fw px-1"
              :icon="icons.faArrowRight"
            />
          </a>
        </template>
      </li>
    </ul>
  </nav>
</template>
