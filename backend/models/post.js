"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User);
    }
  }
  Post.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Nama Judul tidak boleh kosong!",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: "Deskripsi tidak boleh kososng!",
          },
        },
      },
      image: DataTypes.STRING,
      image_url: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate: function (post, options) {
          post.UserId = post.UserId || 0;
        },
      },
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
