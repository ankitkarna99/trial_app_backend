const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const productController = require("../controllers/productController");
const auth = require("../middlewares/auth");

router.get("/", auth, catchErrors(productController.getAllProducts));

module.exports = router;
