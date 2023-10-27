const { User } = require("../models");
const { decryptHash } = require("../helper/decryptHash.js");
const { tokengenerator } = require("../helper/jsonwebtoken.js");

class loginController {
  static async login(req, res) {
    try {
      const { username, password } = req.body;

      const userdatabase = await User.findOne({
        where: { username: username },
      });

      if (userdatabase) {
        if (password.length >= 5) {
          if (decryptHash(password, userdatabase.password)) {
            const token = tokengenerator(userdatabase);

            res
              .status(200)
              .json({ access_token: token, message: "Berhasil login!" });
          } else {
            res.status(400).json({ message: "Password anda salah!" });
          }
        } else {
          res.status(400).json({ message: "Password anda terlalu pendek!" });
        }
      } else {
        res.status(404).json({ message: "Username tidak terdaftar!" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = loginController;
