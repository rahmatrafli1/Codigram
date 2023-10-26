"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Nama Lengkap tidak boleh kosong!",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Username tidak boleh kosong!",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Email tidak boleh kosong!",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Password tidak boleh kosong!",
          },
        },
      },
      image: DataTypes.STRING,
      image_url: DataTypes.STRING,
      address: DataTypes.TEXT,
      nohp: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Nomor HP tidak boleh kosong!",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: function (user, options) {
          user.address = user.address || "-";
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
