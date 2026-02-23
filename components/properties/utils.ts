export function splitAddress(address: string) {
  const firstComma = address.indexOf(',')
  if (firstComma === -1) return { street: address, locality: '' }
  return {
    street: address.substring(0, firstComma),
    locality: address.substring(firstComma + 1).trim(),
  }
}

export function formatShortDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-AU', {
    month: 'short',
    year: 'numeric',
  })
}
