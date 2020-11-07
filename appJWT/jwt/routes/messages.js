var express = require("express");
var router = express.Router();
const Joi = require("joi");
var [
  getProducts,
  insertProduct,
  deleteMessage,
  updateMessage,
  getProduct,
] = require("../controllers/message");

/* GET messages list. */
router.get("/", async function (req, res, next) {
  const products = await getProducts();
  res.send(products);
});

/* GET message. */
router.get("/:ts", async function (req, res, next) {
  var ts = req.params.ts;
  const products = await getProduct(ts);
  res.send(products);
});
/**
 * POST message
 */
router.post("/", async function (req, res, next) {
  const { error } = validateMessage(req.body);

  if (error) {
    return res.status(400).send(error);
  }
  var messageObject = {
    message: req.body.message,
    author: req.body.author,
    timestamp: Date.now(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  const newProduct = await insertProduct(messageObject);
  res.send(newProduct);
});

//Delete message based on timestamp
router.delete("/:ts", async function (req, res, next) {
  var ts = req.params.ts;
  const newMessage = await deleteMessage(ts);
  res.send(newMessage);
});

router.put("/:ts", async function (req, res, next) {
  const { error } = validateMessage(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  var ts = req.params.ts;
  var msg = req.body.message;
  var author = req.body.author;
  const updtMessage = await updateMessage(ts, msg, author);
  res.send(updtMessage);
});

const validateMessage = (client) => {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),
    author: Joi.string()
      .pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+ [a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)
      .required(),
  });

  return schema.validate(client);
};

module.exports = router;
