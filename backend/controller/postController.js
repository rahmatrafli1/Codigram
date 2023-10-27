const errorHandling = require("../helper/errorHandling.js");
const { Post } = require("../models");

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

  static async edit(req, res) {}

  static async delete(req, res) {}
}

module.exports = postController;
