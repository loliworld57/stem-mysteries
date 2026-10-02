export function formatNumber(value: number, digits = 1) {
  return value.toLocaleString("vi-VN", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}
