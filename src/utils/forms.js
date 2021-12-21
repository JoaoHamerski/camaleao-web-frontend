import { has } from 'lodash-es'

export const handleError = (context, error) => {
  context.$toast.error('Algo está incorreto, verifique os dados, por favor.', {
    duration: 4000
  })

  if (has(error, 'errors')) {
    context.form.onFail(error.errors)
  }
}

export const handleSuccess = (context, options) => {
  if (has(options, 'resetForm')) {
    context.form.reset()
  }

  if (has(options, 'message')) {
    context.$toast.success(options.message)
  }

  context.$emit('success')
}
