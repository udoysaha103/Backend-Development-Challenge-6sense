const express = require("express");
const router = express.Router();
const { createCategory, deleteCategory, getAllCategories, updateCategory } = require("../controllers/category.controller");


// create a new category
router.post("/create", createCategory);

// delete a category
router.delete("/delete/:name", deleteCategory);

// get all categories
router.get("/getAll", getAllCategories);

// update a category
router.put("/update/:oldName/:newName", updateCategory);


module.exports = router;