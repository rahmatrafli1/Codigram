const errorHandling = require("../helper/errorHandling.js");
const { Post } = require("../models");
const fs = require("fs");

class postController {
  static async getAll(req, res) {
    try {
      const posts = await Post.findAll({ order: [["id", "ASC"]] });

      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async detail(req, res) {
    try {
      const detailPost = await Post.findOne({ where: { id: req.params.id } });

      detailPost
        ? res.status(200).json(detailPost)
        : res
            .status(404)
            .json({ message: "Post id " + req.params.id + " tidak ada." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async post(req, res) {
    try {
      const { name, description, userId } = req.body;

      if (req.errorvalidatefile) {
        res.status(422).json({ message: req.errorvalidatefile });
      } else {
        if (req.file) {
          const gambar = req.file.filename;
          const url =
            req.protocol + "://" + req.get("host") + "/assets/post/" + gambar;

          const response = await Post.create({
            name: name,
            description: description,
            image: gambar,
            image_url: url,
            userId: userId,
          });

          res
            .status(201)
            .send(errorHandling(response, "Post berhasil dibuat!"));
        } else {
          const gambar = "default.jpeg";
          const url =
            req.protocol +
            "://" +
            req.get("host") +
            "/assets/user/default.jpeg";
          const response = await Post.create({
            name: name,
            description: description,
            image: gambar,
            image_url: url,
            userId: userId,
          });

          res
            .status(201)
            .send(errorHandling(response, "Post berhasil dibuat!"));
        }
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async edit(req, res) {
    try {
      const { name, description, userId } = req.body;

      const imagedatabase = await Post.findOne({
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
        if (oldImageName !== "default.jpeg") {
          fs.unlinkSync(`./assets/post/${oldImageName}`);
        }

        const gambar = req.file.filename;
        const url =
          req.protocol + "://" + req.get("host") + "/assets/user/" + gambar;

        const response = await Post.update(
          {
            name: name,
            description: description,
            image: gambar,
            image_url: url,
            userId: userId,
            oldimage: oldImage,
          },
          { where: { id: req.params.id }, returning: true }
        );

        response
          ? res
              .status(200)
              .send(errorHandling(response, "Berhasil Update Post!"))
          : res.status(404).json({
              message: "Post " + req.params.id + " tidak ada!",
            });
      } else {
        const gambar = oldImageName;
        const url = oldImage;

        const response = await Post.update(
          {
            name: name,
            description: description,
            image: gambar,
            image_url: url,
            userId: userId,
          },
          { where: { id: req.params.id }, returning: true }
        );

        response
          ? res
              .status(200)
              .send(errorHandling(response, "Berhasil Update Post!"))
          : res.status(404).json({
              message: "Post " + req.params.id + " tidak ada!",
            });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const imagedatabase = await Post.findOne({
        attributes: ["image"],
        where: { id: req.params.id },
      });

      if (!imagedatabase) {
        res.status(404).json({ message: "Image Post tidak ditemukan!" });
      } else {
        const oldImage =
          req.protocol +
          "://" +
          req.get("host") +
          "/assets/post/" +
          imagedatabase.image;
        const oldImageName = oldImage.split("/").pop();

        if (oldImageName !== "default.jpeg") {
          fs.unlinkSync("./assets/post/" + oldImageName);
        }

        const response = await Post.destroy({
          where: { id: req.params.id },
        });

        response === 1
          ? res
              .status(200)
              .send(errorHandling(response, "Berhasil Hapus Post!"))
          : res.status(404).json({
              message: "Post " + req.params.id + " tidak ada!",
            });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = postController;
