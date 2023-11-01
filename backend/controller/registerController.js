const { encryptHash } = require("../helper/encryptHash.js");
const errorHandling = require("../helper/errorHandling.js");
const { User } = require("../models");

class registerController {
  static async register(req, res) {
    try {
      const { name, username, email, password, confirmpass, address, nohp } =
        req.body;

      const passhash = encryptHash(password);

      if (req.errorvalidatefile) {
        res.status(422).json({ message: req.errorvalidatefile });
      } else {
        if (req.file) {
          const gambar = req.file.filename;
          const url =
            req.protocol + "://" + req.get("host") + "/assets/user/" + gambar;
          if (password === "") {
            res
              .status(400)
              .json({ message: "Password Anda Tidak Boleh Kosong" });
          } else {
            if (confirmpass === "") {
              res
                .status(400)
                .json({
                  message: "Konfirmasi Password Anda Tidak Boleh Kosong",
                });
            } else {
              if (password.length >= 5) {
                if (password === confirmpass) {
                  const response = await User.create({
                    name: name,
                    username: username,
                    email: email,
                    password: passhash,
                    confirmpass: confirmpass,
                    image: gambar,
                    image_url: url,
                    address: address,
                    nohp: nohp,
                  });
                  res
                    .status(201)
                    .send(errorHandling(response, "Berhasil Register!"));
                } else {
                  res
                    .status(400)
                    .json({ message: "Password anda tidak cocok!" });
                }
              } else {
                res
                  .status(400)
                  .json({ message: "Password anda terlalu pendek!" });
              }
            }
          }
        } else {
          const gambar = "default.png";
          const url =
            req.protocol + "://" + req.get("host") + "/assets/user/default.png";
          if (password === "") {
            res
              .status(400)
              .json({ message: "Password Anda Tidak Boleh Kosong" });
          } else {
            if (confirmpass === "") {
              res
                .status(400)
                .json({
                  message: "Konfirmasi Password Anda Tidak Boleh Kosong",
                });
            } else {
              if (password.length >= 5) {
                if (password === confirmpass) {
                  const response = await User.create({
                    name: name,
                    username: username,
                    email: email,
                    password: passhash,
                    confirmpass: confirmpass,
                    image: gambar,
                    image_url: url,
                    address: address,
                    nohp: nohp,
                  });
                  res
                    .status(201)
                    .send(errorHandling(response, "Berhasil Register!"));
                } else {
                  res
                    .status(400)
                    .json({ message: "Password anda tidak cocok!" });
                }
              } else {
                res
                  .status(400)
                  .json({ message: "Password anda terlalu pendek!" });
              }
            }
          }
        }
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = registerController;
