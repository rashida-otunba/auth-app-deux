var express = require("express");
var axios = require('axios');

const jwt = require("jsonwebtoken");
var router = express.Router();
const isValidToken = require("../middleware/isValidToken");
require("dotenv").config();
const { User } = require("../models"); //added
// var data = '';


/* GET home page. */
// GET data from API and save as variable 
router.get("/", async function (req, res, next) {
 
  var config = {
    method: 'get',
    url: 'https://nashvillecats-814a1-default-rtdb.firebaseio.com/books/-MxfuZIDeD8ZClWLcYYZ.json',
    headers: { },
    
  };
  
 const book= await axios(config) //book is the return of the axios data ; this is the same as data=equals 
  .then(function (response) {
    return response.data //add this 
  })
  .catch(function (error) {
    console.log(error);

  });
  console.log(book)


  res.render("index", { title: "Express", book });



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
