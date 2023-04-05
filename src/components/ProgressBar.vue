<script>
import { random } from 'lodash-es'

// Assume that loading will complete under this amount of time.
const defaultDuration = 1000
// How frequently to update
const defaultInterval = 1000
// 0 - 1. Add some variation to how much the bar will grow at each interval
const variation = 1
// 0 - 100. Where the progress bar should start from.
const startingPoint = 10
// Limiting how far the progress bar will get to before loading is complete
const endingPoint = 30

export default {
  name: 'ProgressBar',
  data () {
    return {
      isLoading: true, // Once loading is done, start fading away
      isVisible: false, // Once animate finish, set display: none
      progress: startingPoint,
      timeoutId: undefined,
    }
  },
  computed: {
    isPageLoading () {
      return this.$store.state['isPageLoading']
    }
  },
  watch: {
    isPageLoading (value) {
      if (value) {
        this.start()
        return
      }

      this.stop()
    }
  },
  methods: {
    start() {
      this.isLoading = true
      this.isVisible = true
      this.progress = startingPoint
      this.loop()
    },
    loop() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
      }

      if (this.progress >= endingPoint) {
        return
      }

      const size = (endingPoint - startingPoint) / (defaultDuration / defaultInterval)
      const p = Math.round(this.progress + random(size * (1 - variation), size * (1 + variation)))

      this.progress = Math.min(p, endingPoint)
      this.timeoutId = setTimeout(
        this.loop,
        random(defaultInterval * (1 - variation), defaultInterval * (1 + variation))
      )
    },
    stop() {
      this.isLoading = false
      this.progress = 100

      clearTimeout(this.timeoutId)

      setTimeout(() => {
        if (!this.isLoading) {
          this.isVisible = false
        }
      }, 200)
    },
  },
}
</script>

<template>
  <div
    v-show="isVisible"
    class="progress"
  >
    <div
      class="progress-bar progress-bar-striped progress-bar-animated bg-camaleao"
      role="progressbar"
      :style="{width: `${progress}%`}"
    />
  </div>
</template>

<style scoped>
  .progress {
    border-radius: 0;
    position: absolute;
    width: 100%;
    z-index: 1100;
    height: 5px;
  }
</style>

