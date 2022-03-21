import { isEmpty } from 'lodash-es'

const getGraphqlErrors = (error) => {
  return error.graphQLErrors[0].extensions.validation
}

const getErrors = (error) => {
  if ('errors' in error) {
    return error.errors
  }

  if ('graphQLErrors' in error) {
    return getGraphqlErrors(error)
  }

  return null
}

export const handleError = (context, error, extraOptions = {}) => {
  const defaultOptions = {
    formProp: 'form'
  }

  const options = { ...defaultOptions, ...extraOptions }

  const errors = getErrors(error)

  if (!isEmpty(errors)) {
    context[options.formProp].onFail(errors)
  }

  context.$toast.error('Algo está incorreto, verifique os dados, por favor.', {
    duration: 4000
  })
}

export const handleSuccess = (context, options = {}) => {
  if ('resetForm' in options) {
    context.form.reset()
  }

  if ('message' in options) {
    context.$toast.success(options.message)
  }

  if ('payload' in options) {
    context.$emit('success', options.payload)
  } else {
    context.$emit('success')
  }
}
