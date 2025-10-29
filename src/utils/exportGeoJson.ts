const pad = (n: number) => String(n).padStart(2, "0");

const generateTimestampedName = (prefix = "geojson") => {
  const date = new Date();
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${prefix}-${year}-${month}-${day}_${hours}-${minutes}-${seconds}.geojson`;
};

export const exportGeoJson = (data: unknown, filename?: string) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename?.trim() || generateTimestampedName();
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};
