<script>
import {
  faArrowLeft,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    pagination: {
      type: Object,
      default: () => ({})
    },
    isLoading: {
      type: Boolean,
      default: false
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
  computed: {
    hasPagination () {
      return this.pagination.total > this.pagination.perPage
    },
    totalPages () {
      return Math.ceil(this.pagination.total / this.pagination.perPage)
    },
    isFirstPageActive () {
      return this.pagination.currentPage === 1
    },
    isLastPageActive () {
      return this.pagination.currentPage === this.totalPages
    },
    pageList () {
      const totalPages = this.totalPages
      const page = this.pagination.currentPage
      const maxLength = this.$isMobile ? 6 : 10

      const range = (start, end) => {
        return Array.from(Array(end - start + 1), (_, i) => i + start)
      }

      const sideWidth = maxLength < 9 ? 1 : 2
      const leftWidth = (maxLength - sideWidth * 2 - 3) >> 1
      const rightWidth = (maxLength - sideWidth * 2 - 2) >> 1

      if (maxLength < 5) {
        throw new Error('maxLength must be at least 5')
      }

      if (totalPages <= maxLength) {
        // no breaks in list
        return range(1, totalPages)
      }

      if (page <= maxLength - sideWidth - 1 - rightWidth) {
        // no break on left of page
        return range(1, maxLength - sideWidth - 1)
          .concat(0, range(totalPages - sideWidth + 1, totalPages))
      }

      if (page >= totalPages - sideWidth - 1 - rightWidth) {
        // no break on right of page
        return range(1, sideWidth)
          .concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages))
      }

      // Breaks on both sides
      return range(1, sideWidth)
        .concat(0, range(page - leftWidth, page + rightWidth),
          0, range(totalPages - sideWidth + 1, totalPages))
    }
  },
  methods: {
    incrementPage (page) {
      const canIncrement = page > 1

      if (canIncrement) {
        this.$emit('input', page - 1)
      }
    },
    decrementPage (page) {
      const canDecrement = page < this.totalPages

      if (canDecrement) {
        this.$emit('input', page + 1)
      }
    },
    paginate (index, isNextButton) {
      const page = parseInt(this.value)

      if (isNextButton === undefined) {
        this.$emit('input', parseInt(index))
        return
      }

      if (!isNextButton) {
        this.incrementPage(page)
        return
      }

      this.decrementPage(page)
    }
  }
}
</script>

<template>
  <nav
    v-if="hasPagination"
    class="d-inline-block"
    aria-label="Paginação"
  >
    <ul class="pagination">
      <li
        class="page-item"
        :class="(isFirstPageActive || isLoading) && 'disabled'"
      >
        <a
          class="page-link clickable px-3"
          @click="paginate(null, false)"
        >
          <FontAwesomeIcon
            class="d-inline-block d-sm-none"
            :icon="icons.faArrowLeft"
          />
          <span class="d-none d-sm-block">Anterior</span>
        </a>
      </li>

      <li
        v-for="(pageNumber, index) in pageList"
        :key="index"
        class="page-item"
        :class="{
          'active': pageNumber === pagination.currentPage,
          'disabled': isLoading || pageNumber === 0
        }"
      >
        <a
          class="page-link clickable"
          @click="paginate(pageNumber)"
        >
          {{ pageNumber === 0 ? '...' : pageNumber }}
        </a>
      </li>

      <li
        class="page-item"
        :class="(isLastPageActive || isLoading) && 'disabled'"
      >
        <a
          class="page-link clickable px-3"
          @click="paginate(null, true)"
        >
          <FontAwesomeIcon
            class="d-inline-block d-sm-none"
            :icon="icons.faArrowRight"
          />
          <span class="d-none d-sm-block">Próximo</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
