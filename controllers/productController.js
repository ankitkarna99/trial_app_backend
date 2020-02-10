exports.getAllProducts = async (req, res) => {
  let products = await pool.query(
    "SELECT products.*, COUNT(wishlist.user_id) as num FROM products LEFT JOIN wishlist ON products.id=wishlist.product_id AND wishlist.user_id=? GROUP BY products.id",
    [req.auth.id]
  );

  products = products.map(product => {
    product.isWished = product.num > 0 ? true : false;
    delete product.num;
    return product;
  });

  res.json(products);
};
