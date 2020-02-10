const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      var payload = jwt.verify(token, process.env.SECRET);
      req.auth = payload;
      next();
    } catch (err) {
      res.status(401).json({
        message: "Unauthorized !!"
      });
    }
  } else {
    res.status(401).json({
      message: "Unauthorized !!"
    });
  }
};
