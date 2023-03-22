<script>
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      icons: {
        faSearch
      }
    }
  },
  methods: {
    onSearchClick () {
      this.$emit('search')
    },
    onClearSearchClick () {
      this.$emit('clear-search')
    }
  }
}
</script>

<template>
  <div class="col-12 col-sm-6">
    <AppInput
      id="code"
      :value="value"
      name="code"
      placeholder="Por código..."
      :default-margin="false"
      @input="$emit('input', $event)"
      @keypress.enter="onSearchClick"
    >
      <template #append>
        <AppButton
          outlined
          :icon="icons.faSearch"
          @click="onSearchClick"
        />
      </template>
    </AppInput>
    <a
      v-if="value !== ''"
      class="text-decoration-none small"
      href="#"
      @click.prevent="onClearSearchClick"
    >Limpar busca</a>
  </div>
</template>
