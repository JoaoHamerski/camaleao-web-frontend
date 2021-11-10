export const handleError = (context, error) => {
  context.$toast.error('Algo está incorreto, verifique os dados, por favor.', {
    duration: 4000
  })

  if (error.errors) {
    context.form.onFail(error.errors)
  }
}

export const handleSuccess = (context, { message, closeModal }) => {
  context.form.reset()

  if (message) {
    context.$toast.success(message)
  }

  context.$emit('submitted')

  if (closeModal) {
    context.modal = false
  }
}
