const { User } = require("../models");
const jwt = require("jsonwebtoken");
const errorHandling = require("../helper/errorHandling.js");
const { decryptHash } = require("../helper/decryptHash.js");

class loginController {
  static async login(req, res) {
    try {
      const { username, password } = req.body;

      const userdatabase = await User.findOne({
        where: { username: username },
      });

      if (userdatabase) {
        if (decryptHash(password, userdatabase.password)) {
          const token = jwt.sign(
            {
              name: userdatabase.name,
              username: userdatabase.username,
              createdAt: userdatabase.createdAt,
            },
            process.env.SECRET_KEY,
            { expiresIn: "15s" }
          );

          res.status(200).send(errorHandling(token, "Berhasil Login!"));
        } else {
          res.status(400).json({ message: "Password anda salah!" });
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
