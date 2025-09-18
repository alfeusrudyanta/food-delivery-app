function formatCurrency(
  amount: number,
  locale: string = 'id-ID',
  currency: string = 'IDR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default formatCurrency;
