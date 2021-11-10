<script>
import 'viewerjs/dist/viewer.css'
import { directive as viewer } from 'v-viewer'

export default {
  directives: {
    viewer: viewer()
  },
  data () {
    return {
      config: {
        inline: false,
        button: true,
        navbar: false,
        title: true,
        toolbar: false,
        tooltip: true,
        movable: true,
        zoomable: true,
        rotatable: false,
        scalable: true,
        transition: true,
        fullscreen: true,
        keyboard: true
      }
    }
  }
}
</script>

<template>
  <div v-viewer="config">
    <slot />
  </div>
</template>

<style>
.viewer-transition {
  transition: all .2s !important;
}
</style>
