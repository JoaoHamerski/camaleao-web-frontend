<script>
import TheHeaderbar from '@/components/Headerbar/TheHeaderbar'
import TheSidebar from '@/components/Sidebar/TheSidebar'

export default {
  components: {
    TheHeaderbar,
    TheSidebar
  }
}
</script>

<template>
  <div>
    <TheHeaderbar />
    <TheSidebar />

    <div id="content">
      <div class="container">
        <slot />
      </div>
    </div>
  </div>
</template>
