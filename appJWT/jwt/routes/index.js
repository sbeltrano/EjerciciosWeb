var express = require("express");
var router = express.Router();

var express = require("express");
var router = express.Router();
const Joi = require("joi");
var [insertUser] = require("../controllers/users");

var HandlerGenerator = require("../handlegenerator.js");
var middleware = require("../middleware.js");

HandlerGenerator = new HandlerGenerator();

/* GET home page. */
router.get("/", middleware.checkToken, HandlerGenerator.index);

router.post("/login", HandlerGenerator.login, async function (req, res, next) {
  var messageObject = {
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  };
  const newProduct = await insertUser(messageObject);
  res.send(newProduct);
});

module.exports = router;
