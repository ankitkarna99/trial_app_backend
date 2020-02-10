const axios = require("axios");
var jwt = require("jsonwebtoken");

exports.loginFromFacebook = async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) throw "Access token is required!";

  const { data } = await axios.get(
    "https://graph.facebook.com/v6.0/me?fields=email,name&access_token=" +
      accessToken
  );

  const { email, name } = data;

  const [result] = await pool.query("SELECT id FROM users WHERE email=?", [
    email
  ]);

  let id = 0;

  if (!result) {
    const resultInsert = await pool.query(
      "INSERT INTO users (email, full_name, picture, login_type, created_at) VALUES (?,?,?,?,?)",
      [
        email,
        name,
        "https://graph.facebook.com/" + data.id + "/picture?type=square",
        "facebook",
        Date.now()
      ]
    );
    id = resultInsert.insertId;
  } else {
    id = result.id;
  }

  const token = jwt.sign({ id }, process.env.SECRET);

  res.json({
    message: "Logged in successfully!",
    token
  });
};

exports.getInfo = async (req, res) => {
  const [
    result
  ] = await pool.query(
    "SELECT full_name as name, email, picture FROM users WHERE id=?",
    [req.auth.id]
  );

  res.json(result);
};
