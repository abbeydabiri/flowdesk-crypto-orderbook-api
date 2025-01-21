export const calculateAverage = (arr: number[]): number => {
  if (arr.length === 0) {
    return 0;
  }

  let avg = arr.reduce((acc, curr) => acc + curr, 0) / arr.length;
  let decimalPlaces = 0;

  for (let i = 0; i < arr.length; i++) {
    decimalPlaces = Math.max(decimalPlaces, getDecimalPlaces(arr[i]));
  }

  return truncateDecimals(avg, decimalPlaces + 1);
}

export const getDecimalPlaces = (num: number): number => {
  const parts = num.toString().split('.');
  return parts.length > 1 ? parts[1].length : 0;
}

export const truncateDecimals = (num: number, decimalPlaces: number): number => {
  return Math.trunc(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
}
