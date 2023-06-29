<script>
import {
  faPlus,
  faPaste,
  faTrashAlt,
  faLightbulb,
  faListUl
} from '@fortawesome/free-solid-svg-icons';

export default {
  props: {
    garment: {
      type: Object,
      required: true
    },
    isDeleteGarmentDisabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    icons: {
      faPlus,
      faPaste,
      faTrashAlt,
      faLightbulb,
      faListUl
    }
  }),
  methods: {
    onNewClick () {
      this.$emit('new-garment')
    },
    onDuplicateClick () {
      this.$emit('duplicate-garment', {...this.garment})
    },
    onDeleteClick () {
      this.$emit('delete-garment', this.garment)
    },
    onHowToUseClick () {
      this.$emit('how-to-use')
    },
    onMatchesClick () {
      this.$emit('show-matches')
    }
  }
}
</script>

<template>
  <div class="d-flex justify-content-between">
    <div class="small">
      <a
        href=""
        class="text-decoration-none"
        @click.prevent="onNewClick"
      >
        <FontAwesomeIcon :icon="icons.faPlus" />
        Novo
      </a>
      <a
        href=""
        class="text-decoration-none mx-3"
        @click.prevent="onDuplicateClick"
      >
        <FontAwesomeIcon :icon="icons.faPaste" />
        Duplicar
      </a>
      <a
        v-if="!isDeleteGarmentDisabled"
        href=""
        class="text-decoration-none"
        @click.prevent="onDeleteClick"
      >
        <FontAwesomeIcon :icon="icons.faTrashAlt" />
        Deletar
      </a>
    </div>
    <div>
      <div>
        <a
          href=""
          class="fw-bold small text-decoration-none"
          @click.prevent="onHowToUseClick"
        >
          <FontAwesomeIcon
            :icon="icons.faLightbulb"
            fixed-width
          />
          Como usar
        </a>
      </div>
      <div>
        <a
          href=""
          class="fw-bold small text-decoration-none"
          @click.prevent="onMatchesClick"
        >
          <FontAwesomeIcon
            :icon="icons.faListUl"
            fixed-width
          />
          Combinações
        </a>
      </div>
    </div>
  </div>
</template>
