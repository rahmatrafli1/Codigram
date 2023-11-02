const jwt = require("jsonwebtoken");

const tokengenerator = (data) => {
  const { id, name, username, image, image_url, createdAt } = data;
  return jwt.sign(
    { id, name, username, image, image_url, createdAt },
    process.env.SECRET_KEY
  );
};

const tokencheck = (data) => {
  return jwt.verify(data, process.env.SECRET_KEY);
};

module.exports = { tokengenerator, tokencheck };
