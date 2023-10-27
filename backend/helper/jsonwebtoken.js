const jwt = require("jsonwebtoken");

const tokengenerator = (data) => {
  const { id, name, username, createdAt } = data;
  return jwt.sign({ id, name, username, createdAt }, process.env.SECRET_KEY);
};

const tokencheck = (data) => {
  return jwt.verify(data, process.env.SECRET_KEY);
};

module.exports = { tokengenerator, tokencheck };
