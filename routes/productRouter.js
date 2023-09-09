const express = require('express');
const { createProduct } = require('../controllers/productController');
const router = express.Router();

router.route("/product/new").post(createProduct);

module.exports = router;