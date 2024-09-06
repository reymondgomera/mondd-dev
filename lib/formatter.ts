const PRECENTAGE_FORMATTER = new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 })

const BYTE_FORMATTER = Intl.NumberFormat('en', { notation: 'compact', style: 'unit', unit: 'byte', unitDisplay: 'narrow' })

export function formatCurrency(amount: number) {
  const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
    currency: 'PHP',
    style: 'currency',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    notation: amount > 999_999 ? 'compact' : 'standard'
  })

  return CURRENCY_FORMATTER.format(amount)
}

export function formatPercentage(amount: number) {
  return PRECENTAGE_FORMATTER.format(amount)
}

export function formatNumber(number: number) {
  const NUMBER_FORMATTER = new Intl.NumberFormat('en-US', { notation: number > 999_999 ? 'compact' : 'standard' })

  return NUMBER_FORMATTER.format(number)
}

export function formatByte(number: number) {
  return BYTE_FORMATTER.format(number)
}
