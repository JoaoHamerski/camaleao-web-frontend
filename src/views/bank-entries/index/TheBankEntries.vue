<script>
import TheBankEntriesHeader from './TheBankEntriesHeader.vue'
import TheBankEntriesBody from './TheBankEntriesBody.vue'

export default {
  components: {
    TheBankEntriesHeader,
    TheBankEntriesBody
  }
}
</script>

<template>
  <div class="pt-2 pb-5">
    <TheBankEntriesHeader />
    <TheBankEntriesBody />
  </div>
</template>
