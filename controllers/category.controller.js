const Category = require("../models/category.model");


// create a new category
const createCategory = async (req, res) => {
    try{
        const category = await Category.create(req.body);

        if (!category) {
            return res.status(400).json({message: "Category could not be created"});
        }

        return res.status(201).json({category});
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({message: "Category already exists"});
        }
        else {
            return res.status(500).json({message: err.message});
        }
    }
};


// delete a category
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({name: req.params.name});

        if (!category) {
            return res.status(404).json({message: "Category not found"});
        }

        return res.status(200).json({message: "Category deleted"});
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    }
};


// get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        if (!categories) {
            return res.status(404).json({message: "No categories found"});
        }

        return res.status(200).json({categories});
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    }
};


// update a category
const updateCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate({name: req.params.oldName}, {name: req.params.newName}, {new: true});

        if (!category) {
            return res.status(404).json({message: "Category not found"});
        }

        return res.status(200).json({category});
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({message: "Category already exists"});
        }
        else {
            return res.status(500).json({message: err.message});
        }
    }
};


module.exports = {
    createCategory,
    deleteCategory,
    getAllCategories,
    updateCategory
};