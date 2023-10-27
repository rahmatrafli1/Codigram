const { Post } = require("../models");

class postController {
  static async getAll(req, res) {
    const posts = await Post.findAll({ order: [["id", "ASC"]] });

    res.status(200).json(posts);
  }

  static async detail(req, res) {
    const detailPost = await Post.findOne({ where: { id: req.params.id } });

    detailPost
      ? res.status(200).json(detailPost)
      : res
          .status(404)
          .json({ message: "Post id " + req.params.id + " tidak ada." });
  }

  static async post(req, res) {}
  static async edit(req, res) {}
  static async delete(req, res) {}
}

module.exports = postController;
