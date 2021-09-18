export const mask = (str, format) => {
  let i = 0

  const masked = format.replace(/#/g, () => {
    return str.charAt(i++) || '#'
  })

  return masked
}

export const maskPhone = (str) => {
  const formats = {
    8: '####-####',
    9: '# ####-####',
    10: '(##) ####-####',
    11: '(##) # ####-####'
  }

  return mask(str, formats[str.length])
}
