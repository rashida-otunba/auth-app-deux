var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
require("dotenv").config; //this will allow you yo use process.env in this package
const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR));
const { User } = require("../models");
const jwt = require("jsonwebtoken");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body; //RO: if someone wants to register they need to give us these things;
  const hash = bcrypt.hashSync(password, saltRounds);

  const user = await User.create({
    username: username,
    password: hash, //bring in the hashed password
    email: email,
  });
  res.json({
    id: user.id,
    username: user.username,
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body; //RO: if someone wants to register they need to give us these things;

  const user = await User.findOne({
    where: {
      //where is the key
      username: username,
    },
  });
  if (user) {
    const comparePass = bcrypt.compareSync(password, user.password); //taking in input from req body user.password is comparing it to the database password
    if (comparePass) {
      //determining if this is true or not; you do not have to declare it as true
      const token = jwt.sign(
        {
          data: user.username,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.cookie("token", token);
      // res.redirect("/profile");
      res.redirect(`/profile/${user.id}`);
    } else {
      res.send("wrong password ");
    }
  } else {
    res.send("sorry, there was no user found in the database");
  }
});

module.exports = router;
