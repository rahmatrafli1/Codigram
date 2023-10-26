const multer = require("multer");

const allowedfileExt = ["jpg", "jpeg", "png"];
const filefilterOpt = (req, file, cb) => {
  const ext = file.originalname.split(".").pop();
  const maxSize = 1 * 1024 * 1024; // 1 MB

  if (allowedfileExt.includes(ext.toLowerCase())) {
    if (req.headers["content-length"] > maxSize) {
      req.errorvalidatefile = "Hanya boleh masukkan gambar kurang dari 1 MB!";
      cb(null, false);
    } else {
      cb(null, true);
    }
  } else {
    req.errorvalidatefile = "Hanya boleh berformat .jpg, .jpeg, dan .png!";
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/user");
  },
  filename: function (req, file, cb) {
    const configsuffix = Math.round(Math.random() * 1e9);
    const ext = file.originalname.split(".").pop();
    cb(null, file.fieldname + configsuffix + "." + ext);
  },
});

const upload = multer({ storage: storage, fileFilter: filefilterOpt });

module.exports = upload;
