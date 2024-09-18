export const thousandFormatter = (value: number) => {
  if (typeof value === "undefined" || isNaN(value)) return "0";

  const number = value / 100; // Divide by 100 to convert to currency

  // Handle the conversion for thousands (k), millions (m), billions (b), etc.
  const absNumber = Math.abs(number);

  const formatNumber = (value: number) => {
    return value % 1 === 0 ? value.toFixed(0) : value.toFixed(1); // Remove .0 for whole numbers
  };

  if (absNumber >= 1e9) {
    return formatNumber(number / 1e9) + "B"; // Billions
  } else if (absNumber >= 1e6) {
    return formatNumber(number / 1e6) + "M"; // Millions
  } else if (absNumber >= 1e3) {
    return formatNumber(number / 1e3) + "K"; // Thousands
  }

  return formatNumber(number); // Less than 1,000, keep the original number
};

export const convertArrayToSelectOptions = (values: string[] | number[]) => {
  return values.map((value) => ({ label: value, value }));
};

export const convertModelArrayToSelectOptions = (
  items: {
    [e: string | number]: string | number;
  }[],
  value: string | number,
  label: string | number,
  includeOriginal: boolean
) => {
  return items.map((item) => ({
    ...(includeOriginal ? { ...item } : {}),
    value: item[value] || "",
    label: item[label] || "",
  }));
};
