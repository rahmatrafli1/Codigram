const bcrypt = require("bcrypt");

const decryptHash = (data, hash) => {
  return bcrypt.compareSync(String(data), hash);
};

module.exports = { decryptHash };
