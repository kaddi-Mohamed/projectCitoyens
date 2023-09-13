const fs = require("fs");
const deleteImage = (filename, url) => {
  fs.unlink(`${url}/${filename}`, (err) => {
    if (err) throw err;
    console.log(`Successfully deleted ${filename}`);
  });
};
module.exports = deleteImage;
