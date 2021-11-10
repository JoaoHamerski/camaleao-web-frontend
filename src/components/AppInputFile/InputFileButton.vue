<script>
import { faUpload } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    centered: {
      type: Boolean,
      default: false
    },
    error: {
      type: [String, Boolean],
      default: false
    }
  },
  data () {
    return {
      icons: {
        faUpload
      }
    }
  }
}
</script>

<template>
  <div
    :class="{
      'text-center': centered
    }"
    v-on="$listeners"
  >
    <label
      :for="id"
      class="btn"
      :class="{
        'btn-outline-primary': !error,
        'btn-outline-danger': error,
        'px-5': centered
      }"
    >
      <FontAwesomeIcon
        :icon="icons.faUpload"
        :class="!centered && 'me-2'"
      />
      <br v-show="centered">
      Enviar arquivo
    </label>

    <small
      v-if="centered"
      class="text-secondary d-block"
    >
      OU ARRASTE E SOLTE
    </small>
  </div>
</template>
