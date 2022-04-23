export const getCurrencyFormat = (amount: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
    .format(amount)
    .replace(/[^0-9,.]/g, '')
}
