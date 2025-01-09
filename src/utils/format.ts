export const formatCurrency = (value?: number) => {
  if (value === undefined || value === null) return '0.00';
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatWinLoss = (value?: number) => {
  if (value === undefined || value === null) return '0.00';
  const formattedValue = formatCurrency(Math.abs(value));
  return value >= 0 ? `+${formattedValue}` : `-${formattedValue}`;
};
