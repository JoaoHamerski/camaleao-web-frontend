<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    modalDialogClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    modalDialogClasses () {
      return 'modal-lg ' + this.modalDialogClass
    }
  }
}
</script>
<template>
  <AppModal
    id="viewerFileModal"
    :modal-dialog-class="modalDialogClasses"
    footer-class="bg-secondary"
    v-bind="$attrs"
    v-on="$listeners"
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
        class="text-center mb-3 responsive-iframe-container"
      >
        <iframe
          class="responsive-iframe"
          :src="src"
          allowfullscreen
        />
      </div>
    </template>
    <template #footer>
      <AppButton
        color="light"
        data-bs-dismiss="modal"
      >
        Fechar
      </AppButton>
    </template>
  </AppModal>
</template>

<style scoped>
.responsive-iframe-container {
  padding-top: 75%;
}

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
