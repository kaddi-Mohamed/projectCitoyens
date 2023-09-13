export function truncateTitle(title, maxLength) {
  if (title.length > maxLength) {
    return title.slice(0, maxLength - 3) + "...";
  } else {
    return title;
  }
}
export function formatDate(isoString) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const outputString = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}/${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return outputString;
}
export function getVideoIdFromUrl(url) {
  const videoIdMatch = url.match(/v=([\w-]{11})/);
  if (videoIdMatch) {
    return videoIdMatch[1];
  } else {
    return null;
  }
}
