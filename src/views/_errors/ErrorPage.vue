<script>
import MainLayout from '@/views/MainLayout.vue'
import ErrorLayout from './ErrorLayout.vue'

const errors = {
  403: 'ACESSO NEGADO',
  404: 'PÁGINA NÃO ENCONTRADA'
}

export default {
  metaInfo() {
    return {
      title: errors[this.error]
    }
  },
  components: {
    MainLayout,
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
  }
}
</script>
<template>
  <MainLayout :error="error">
    <ErrorLayout>
      <template #code>
        {{ error }}
      </template>
      <template #message>
        {{ errors[error] }}
      </template>
    </ErrorLayout>
  </MainLayout>
</template>
