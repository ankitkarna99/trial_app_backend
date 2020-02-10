const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.post("/login/facebook", catchErrors(userController.loginFromFacebook));
router.get("/info", auth, catchErrors(userController.getInfo));

module.exports = router;
