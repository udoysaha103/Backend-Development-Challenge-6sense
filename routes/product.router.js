const express = require("express");
const router = express.Router();
const { createProduct, deleteProduct, getAllProducts, updateAvailability, updateDescription, updateDiscount, filterByCategory, filterByName } = require("../controllers/product.controller");


// create a new product
router.post("/create", createProduct);

// delete a product
router.delete("/delete/:name", deleteProduct);

// get all products
router.get("/getAll", getAllProducts);

// update a product
router.put("/update/availability/:name", updateAvailability);
router.put("/update/description/:name", updateDescription);
router.put("/update/discount/:name/:newDiscount", updateDiscount);

// filter products
router.get("/filter/category/:categoryName", filterByCategory);
router.get("/filter/name/:name", filterByName);


module.exports = router;