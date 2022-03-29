<script>
import ErrorLayout from './ErrorLayout.vue'

const errors = {
  403: 'ACESSO NEGADO',
  404: 'PÁGINA NÃO ENCONTRADA'
}

export default {
  components: {
    ErrorLayout
  },
  props: {
    error: {
      type: [String, Number],
      required: true,
      validator: (value) => [403, 404].includes(value)
    }
  },
  data () {
    return {
      errors
    }
  },
  computed: {
    getComponent () {
      if (this.error === 404) {
        return NotFound404
      }

      return ''
    }
  }
}
</script>
<template>
  <div class="h-100">
    <ErrorLayout>
      <template #code>
        {{ error }}
      </template>
      <template #message>
        {{ errors[error] }}
      </template>
    </ErrorLayout>
  </div>
</template>
