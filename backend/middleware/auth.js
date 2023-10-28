const { tokencheck } = require("../helper/jsonwebtoken");

const auth = (req, res, next) => {
  const access_token = req.headers.access_token;

  if (access_token) {
    try {
      let verifytoken = tokencheck(access_token);
      req.userData = verifytoken;
      next();
    } catch (error) {
      res.status(401).json({ message: "Token anda salah!" });
    }
  } else {
    res
      .status(401)
      .json({ message: "Tokennya tidak ada, karena anda belum login!" });
  }
};

module.exports = { auth };
