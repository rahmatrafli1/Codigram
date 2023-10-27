const errorHandling = require("../helper/errorHandling.js");
const { User } = require("../models");
const fs = require("fs");
const bcrypt = require("bcrypt");

class userController {
  static async getAll(req, res) {
    try {
      const users = await User.findAll({ order: [["id", "ASC"]] });

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async detail(req, res) {
    try {
      const detailUser = await User.findOne({ where: { id: req.params.id } });

      detailUser
        ? res.status(200).json(detailUser)
        : res
            .status(404)
            .json({ message: "User id " + req.params.id + " tidak ada." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async edit(req, res) {
    try {
      const { name, username, email, password, address, nohp } = req.body;

      const genhash = bcrypt.genSaltSync(10, "a");
      const passhash = bcrypt.hashSync(password, genhash);

      const imagedatabase = await User.findOne({
        attributes: ["image"],
        where: { id: req.params.id },
      });

      const oldImage =
        req.protocol +
        "://" +
        req.get("host") +
        "/assets/user/" +
        imagedatabase.image;
      const oldImageName = oldImage.split("/").pop();

      if (req.errorvalidatefile) {
        res.status(422).json({ message: req.errorvalidatefile });
      }

      if (req.file) {
        if (oldImageName !== "default.png") {
          fs.unlinkSync(`./assets/user/${oldImageName}`);
        }
        const gambar = req.file.filename;
        const url =
          req.protocol + "://" + req.get("host") + "/assets/user/" + gambar;

        const response = await User.update(
          {
            name: name,
            username: username,
            email: email,
            password: passhash,
            image: gambar,
            image_url: url,
            address: address,
            nohp: nohp,
            oldimage: oldImage,
          },
          { where: { id: req.params.id }, returning: true }
        );

        response
          ? res
              .status(200)
              .send(errorHandling(response, "Berhasil Update User!"))
          : res.status(404).json({
              message: "User " + req.params.id + " tidak ada!",
            });
      } else {
        const gambar = oldImageName;
        const url = oldImage;

        const response = await User.update(
          {
            name: name,
            username: username,
            email: email,
            password: passhash,
            image: gambar,
            image_url: url,
            address: address,
            nohp: nohp,
          },
          { where: { id: req.params.id }, returning: true }
        );

        response
          ? res
              .status(200)
              .send(errorHandling(response, "Berhasil Update User!"))
          : res.status(404).json({
              message: "User " + req.params.id + " tidak ada!",
            });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = userController;
