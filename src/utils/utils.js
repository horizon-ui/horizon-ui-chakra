export function convertMongoDBTimeToHourMinDate(mongoTime) {
  const dateObj = new Date(mongoTime);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const date = dateObj.toDateString();

  return `${hours}:${minutes}, ${date}`;
}
export function convertToCurrencyFormat(amount) {
  const formattedAmount = new Intl.NumberFormat("vi-VN").format(amount);
  return formattedAmount;
}
