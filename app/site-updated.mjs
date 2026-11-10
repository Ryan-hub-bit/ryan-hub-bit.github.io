/** Format the deployment month in the site owner's timezone, not the visitor's. */
export function formatLastUpdated(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(date);
  const year = parts.find((part) => part.type === "year").value;
  const month = parts.find((part) => part.type === "month").value;
  const englishMonth = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    month: "long",
  }).format(date);

  return {
    dateTime: `${year}-${month}`,
    en: `Last updated ${englishMonth} ${year}`,
    zh: `最近更新：${year} 年 ${Number(month)} 月`,
  };
}
