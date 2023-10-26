const errorHandling = require("../helper/errorHandling.js");
const { User } = require("../models");
const bcrypt = require("bcrypt");

class registerController {
  static async register(req, res) {
    try {
      const {
        name,
        username,
        email,
        image,
        image_url,
        password,
        confirmpass,
        address,
        nohp,
      } = req.body;

      const genhash = bcrypt.genSaltSync(10, "a");
      const passhash = bcrypt.hashSync(password, genhash);

      if (password === confirmpass) {
        const response = await User.create({
          name: name,
          username: username,
          email: email,
          password: passhash,
          confirmpass: confirmpass,
          image: image,
          image_url: image_url,
          address: address,
          nohp: nohp,
        });
        res.status(201).send(errorHandling(response, "Berhasil Register!"));
      } else {
        res.status(400).json({ message: "Password anda tidak cocok!" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = registerController;
