export const thousandFormatter = (number: number) => {
  if (typeof number === "undefined") return 0;

  const parts = parseFloat(number?.toString()).toFixed(2).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
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
