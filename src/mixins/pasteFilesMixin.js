export default {
  methods: {
    async onPasteEvent (event) {
      try {
        const items = event.clipboardData.items
        const files = await this.getBase64Files(items)

        this.transferedItems = files

        if ('afterPaste' in this) {
          this.afterPaste(files)
        }
      } catch (error) {
        this.$toast.error('Não foi possível detectar um arquivo na área de transferência.')
      }
    }
  }
}
