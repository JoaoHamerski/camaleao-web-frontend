<script>
export default {
  props: {
    id: {
      type: String,
      default: 'viewerFileModal'
    },
    src: {
      type: String,
      required: true
    },
    modalDialogClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isLoading: true
    }
  },
  computed: {
    modalDialogClasses () {
      return 'modal-lg ' + this.modalDialogClass
    }
  },
  methods: {
    onLoad () {
      this.isLoading = false
    },
    enableLoading () {
      this.isLoading = true
    }
  }
}
</script>
<template>
  <AppModal
    :id="id"
    :modal-dialog-class="modalDialogClasses"
    footer-class="bg-secondary"
    v-bind="$attrs"
    v-on="$listeners"
    @show="enableLoading"
  >
    <template
      v-if="!$slots.title"
      #title
    >
      Visualização de arquivo
    </template>

    <template
      v-else
      #title
    >
      <slot name="title" />
    </template>

    <template #body>
      <div
        v-show="!isLoading"
        class="text-center mb-3 responsive-iframe-container"
      >
        <iframe
          class="responsive-iframe"
          :src="src"
          allowfullscreen
          @load="onLoad"
        />
      </div>
      <div v-show="isLoading">
        <AppLoading />
      </div>
    </template>

    <template #footer>
      <AppButton
        type="button"
        color="light"
        data-bs-dismiss="modal"
      >
        Fechar
      </AppButton>
    </template>
  </AppModal>
</template>

<style scoped>
.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>
