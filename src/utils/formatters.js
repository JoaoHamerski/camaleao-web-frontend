export const format = (str, pattern) => {
  let i = 0

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
