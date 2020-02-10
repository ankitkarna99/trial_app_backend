const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const wishlistController = require("../controllers/wishlistController");
const auth = require("../middlewares/auth");

router.get("/add/:id", auth, catchErrors(wishlistController.addToWishList));
router.get(
  "/remove/:id",
  auth,
  catchErrors(wishlistController.removeFromWishList)
);

module.exports = router;
