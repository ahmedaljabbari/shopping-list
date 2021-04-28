const express = require("express");
const router = express.Router();
const Product = require("../model/Product");


router.get("/products", (req, res) => {
  Product.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

router.delete('/product/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id).then(item => {
    res.send("DONE")
  })
})


router.post("/product", (req, res) => {
  Product.create(req.body).then(item => {
    res.send(item)
  })
})

module.exports = router;
