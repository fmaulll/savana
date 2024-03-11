export function formatDate(date) {
  const currentDate = new Date(date);
  const month = String(
    currentDate.toLocaleDateString("en-US", { month: "long" })
  ); // Adding 1 to month because getMonth() returns zero-based index
  const year = currentDate.getFullYear();
  return `${month} ${year}`;
}

export function formatFullDate(fulldate) {
  const date = new Date(fulldate);
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const dayName = days[date.getDay()];
  const dayOfMonth = String(date.getDate()).padStart(2, "0");
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName} ${dayOfMonth} ${monthName} ${year}`;
}

export function formatDateMonthYear(fulldate) {
  const date = new Date(fulldate);
  const dayOfMonth = String(date.getDate()).padStart(2, "0");
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayOfMonth} ${monthName} ${year}`;
}
