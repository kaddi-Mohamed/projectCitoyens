const getFileNameFromURL = (url) => {
  const lastSlashIndex = url.lastIndexOf("/");
  return url.substring(lastSlashIndex + 1);
};
module.exports = getFileNameFromURL;
