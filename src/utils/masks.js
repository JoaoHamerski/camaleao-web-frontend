export const maskDate = {
  date: true,
  delimiter: '/',
  datePattern: ['d', 'm', 'Y']
}

export const maskPhone = {
  phone: true,
  phoneRegionCode: 'br'
}

export const maskValueBRL = (options = {}) => ({
  prefix: 'R$ ',
  numeral: true,
  numeralDecimalMark: ',',
  delimiter: '.',
  numeralDecimalScale: 2,
  ...options
})

export const maskInteger = (options = {}) => ({
  numeral: true,
  delimiter: '.',
  numeralIntegerScale: 5,
  ...options
})
