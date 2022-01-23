<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    users: gql`{
      users {
        data {
          email
          role {
            name
          }
        }
      }
    }
    `
  },
  data () {
    return {
      users: []
    }
  }
}
</script>

<template>
  <div>
    <h1>Página de testes</h1>
  </div>
</template>
