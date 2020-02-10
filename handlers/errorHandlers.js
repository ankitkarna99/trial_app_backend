exports.catchErrors = function(fn) {
  return function(req, res) {
    return fn(req, res).catch(err => {
      console.log(err);
      if (
        (err.sqlMessage || err.sqlState || err.sql || err.code) &&
        process.env.ENV !== "DEBUG"
      ) {
        res.status(500).json({
          message: "Internal Server Error"
        });
      } else {
        res.status(400).json({
          message: err
        });
      }
    });
  };
};

exports.notFound = (req, res, next) => {
  res.status(404).json({
    message: "Not found!"
  });
};
