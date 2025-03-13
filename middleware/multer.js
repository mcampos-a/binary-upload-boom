const multer = require("multer");
const path = require("path");

module.exports = multer({ //node middleware that handles the submittion of a form with multiple fields and file inputs(data types)
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") { //checks on the data type of the image uploaded
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
