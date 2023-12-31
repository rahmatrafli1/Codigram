const errorHandling = require("../helper/errorHandling.js");
const { User } = require("../models");
const fs = require("fs");
const { encryptHash } = require("../helper/encryptHash.js");

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

      const passhash = encryptHash(password);

      const UserId = +req.userData.id;

      const imagedatabase = await User.findOne({
        attributes: ["image"],
        where: { id: UserId },
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
          { where: { id: UserId }, returning: true }
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
          { where: { id: UserId }, returning: true }
        );

        response
          ? res
              .status(200)
              .send(errorHandling(response, "Berhasil Update User!"))
          : res.status(404).json({
              message: "User " + UserId + " tidak ada!",
            });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const imagedatabase = await User.findOne({
        attributes: ["image"],
        where: { id: req.params.id },
      });

      if (!imagedatabase) {
        res.status(404).json({ message: "Image User tidak ditemukan" });
      } else {
        const oldImage =
          req.protocol +
          "://" +
          req.get("host") +
          "/assets/user/" +
          imagedatabase.image;
        const oldImageName = oldImage.split("/").pop();

        if (oldImageName !== "default.png") {
          fs.unlinkSync(`./assets/user/${oldImageName}`);
        }

        const response = await User.destroy({
          where: { id: req.params.id },
        });

        response === 1
          ? res
              .status(200)
              .send(errorHandling(response, "Berhasil Hapus User!"))
          : res.status(404).json({
              message: "User " + req.params.id + " tidak ada!",
            });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = userController;
