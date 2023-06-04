const multer = require('multer');
const path = require('path');

const clientStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(".", "public", "client_documents"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});


const studentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(".", "public", "student_documents"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const studentUpload = multer({ storage: studentStorage })
const clientUpload = multer({ storage: clientStorage })

module.exports = { studentUpload, clientUpload };