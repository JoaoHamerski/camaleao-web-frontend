<script>
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
export default {
  data () {
    return {
      icons: {
        faArrowAltCircleLeft
      }
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<template>
  <div
    class="clickable"
    @click="goBack"
  >
    <FontAwesomeIcon
      class="text-white mx-3 mr-5"
      size="lg"
      :icon="icons.faArrowAltCircleLeft"
    />
  </div>
</template>

<style lang="scss" scoped>
.clickable {
  display: flex;
  align-items: center;
  height: 48px;
  transition: background-color .15s;
}

.clickable:hover {
  background-color: rgba(255, 255, 255, .1)
}
.clickable:active {
  background-color: rgba(255, 255, 255, .2)
}
</style>
