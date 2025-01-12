const express = require("express");
const router = express.Router();
const { createCategory, deleteCategory, getAllCategories, updateCategory } = require("../controllers/category.controller");


// create a new category
router.post("/create", createCategory);

// delete a category
router.delete("/delete/:id", deleteCategory);

// get all categories
router.get("/getAll", getAllCategories);

// update a category
router.put("/update/:id", updateCategory);


module.exports = router;