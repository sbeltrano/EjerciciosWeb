var express = require('express');
var router = express.Router();

const Joi = require("joi");
const Message = require("../models/message");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
