import { map, filter, uniqueId } from 'lodash-es'

export default {
  methods: {
    /**
     * Verifica se o arquivo é de origem da área de transferencia,
     * se for converte para tipo File, senão retorna apenas o tipo.
     *
     * @param {File|DataTransferItem} item
     * @return {File}
     */
    getFile (item) {
      if (item instanceof DataTransferItem) {
        return item.getAsFile()
      }

      return item
    },
    getOnlyValidFiles (files, validTypes) {
      const validFiles = filter(
        files,
        file => this.$helpers.strContainsAny(file.type, validTypes)
      )

      if (files.length !== validFiles.length) {
        this.$toast.error('Alguns arquivos estão no formato inválido, por isso não foram enviados.', {
          duration: 7000
        })
      }

      return validFiles
    },
    /**
     * Retorna um a lista de arquivos passados em um array de objetos
     * com o arquivo em base64.
     *
     * @param {array} items
     */
    async getBase64Files (items) {
      const base64Files = []

      await Promise.all(map(items, item => {
        const file = this.getFile(item)
        const { size, name, type } = file

        return this.$helpers.inputFileToBase64(file)
          .then(base64 => {
            base64Files.push({
              key: uniqueId('file_'),
              base64,
              name,
              size,
              type
            })
          })
      }))

      return base64Files
    }
  }
}
