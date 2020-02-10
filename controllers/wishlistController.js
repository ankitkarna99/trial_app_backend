exports.addToWishList = async (req, res) => {
  const [
    wish
  ] = await pool.query(
    "SELECT id FROM wishlist WHERE product_id=? AND user_id=?",
    [req.params.id, req.auth.id]
  );

  if (wish) throw "You already have this in your wishlist.";

  pool.query("INSERT INTO wishlist (product_id, user_id) VALUES (?,?)", [
    req.params.id,
    req.auth.id
  ]);

  res.json({
    message: "Product added to wishlist!"
  });
};

exports.removeFromWishList = async (req, res) => {
  await pool.query("DELETE FROM wishlist WHERE product_id=? AND user_id=?", [
    req.params.id,
    req.auth.id
  ]);

  res.json({
    message: "Product removed from wishlist!"
  });
};
