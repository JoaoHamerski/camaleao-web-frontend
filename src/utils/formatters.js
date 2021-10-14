import { isNil } from 'lodash-es'

export const format = (str, pattern) => {
  let i = 0

  if (isNil(str)) {
    return null
  }

  const formatted = pattern.replace(/#/g, () => {
    return str.charAt(i++) || '#'
  })

  return formatted
}

export const formatPhone = (str) => {
  const patterns = {
    8: '####-####',
    9: '# ####-####',
    10: '(##) ####-####',
    11: '(##) # ####-####'
  }
  const length = str?.length || 0

  if (length < 8 || length > 11) {
    return null
  }

  return format(str, patterns[str.length])
}

export const formatMoney = (str) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(str)
}

export default {
  formatPhone,
  formatMoney
}
