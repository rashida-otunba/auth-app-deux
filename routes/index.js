var express = require("express");
const jwt = require("jsonwebtoken");
var router = express.Router();
const isValidToken = require("../middleware/isValidToken");
require("dotenv").config();
const { User } = require("../models"); //added

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.get("/register", function (req, res, next) {
  res.render("register");
});

// router.get('/profile', isValidToken, function(req, res, next) {
//   // console.log("is there decoded data?", decoded)
//   res.render('profile',
//   // {name: decoded.data}
//   );
// });

//code that allows you to see the users name in the protected route
router.get("/profile/:id", isValidToken, async function (req, res, next) {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id: id,
    },
  });

  res.render("profile", { name: user.username });
});

module.exports = router;
