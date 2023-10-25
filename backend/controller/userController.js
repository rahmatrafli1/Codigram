const { User } = require("../models");

class userController {
  static async getAll(req, res) {
    try {
      const users = await User.findAll();

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
