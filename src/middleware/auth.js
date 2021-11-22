const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.headers["x-access-token"] && req.headers["x-access-token"].toString();

  if (!token) {
    return res.sendStatus(403);
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    try {
      if (err) {
        console.error(err.message);
        return res.sendStatus(403);
      }

      req.decoded = { auth: true, decoded };

      console.log(decoded);

      if (decoded.role != "ADMIN") {
        return res.sendStatus(401);
      }

      next();
    } catch (err) {
      console.error(err);
    }
  });
};

module.exports = verifyToken;
