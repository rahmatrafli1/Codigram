const bcrypt = require("bcrypt");
const genhash = bcrypt.genSaltSync(10, "a");

const encryptHash = (data) => {
  return bcrypt.hashSync(String(data), genhash);
};

module.exports = { encryptHash };
