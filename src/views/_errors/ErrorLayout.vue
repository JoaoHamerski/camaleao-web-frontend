<script>
import SVGInject from '@iconfu/svg-inject'
import { faHome } from '@fortawesome/free-solid-svg-icons'

export default {
  data () {
    return {
      icons: {
        faHome
      }
    }
  },
  methods: {
    SVGInject,
    redirectToHome () {
      this.$router.push('/')
    }
  }
}
</script>
<template>
  <div class="h-100 bg-dark">
    <div class="py-5">
      <img
        class="camaleao-svg img-fluid"
        src="@/assets/images/logo.svg"
        @load="SVGInject($event.target)"
      >
    </div>
    <div class="message-wrapper d-flex justify-content-center align-items-center">
      <div class="page-text ">
        <h3 class="text-center fw-bold text-camaleao">
          <slot name="code" />
        </h3>
        <span>
          <slot name="message" />
        </span>
        <div class="text-center mt-3">
          <FontAwesomeIcon
            class="link-primary clickable"
            :icon="icons.faHome"
            size="2x"
            @click.prevent="redirectToHome"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import "@/sass/variables/all";

.message-wrapper {
  span {
    font-weight: bold;
    color: $secondary;
  }
}

::v-deep {
  .camaleao-svg {
    height: 200px !important;
  }

  @media (max-width: 500px) {
    .camaleao-svg {
      height: 300px;
    }
  }

  .camaleao-svg path {
    fill: transparent;
    stroke-width: 2.5rem;
    stroke:$camaleao;
    stroke-dasharray: 4000;
    stroke-dashoffset: 1000;
    animation: dash 5s linear alternate infinite;
  }

  @keyframes dash {
    from { stroke-dashoffset: 9000 }
    to { stroke-dashoffset: 0 }
  }
}
</style>
