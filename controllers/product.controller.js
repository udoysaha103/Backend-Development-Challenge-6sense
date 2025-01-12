const Product = require('../models/product.model');
const Category = require('../models/category.model');

const crypto = require("crypto");


// create a new product
const generateProductCode = (productName) => {
    if (!productName) {
        return null;
    }

    // hash the product name
    const hashedValue = crypto.createHash("sha256").update(productName).digest("hex").slice(0, 7);

    // convert the product name to lowercase
    productName = productName.toLowerCase();

    // only consider alphabetical characters
    productName = productName.replace(/[^a-z]/g, '');

    let results = [];  // stores the possible product codes in the format [possibleProductCode, start, end]
    let i = 0;

    while (i < productName.length) {
        let possibility = [productName[i], i];

        let flag = true;  // flag to check if the loop is broken due to the end of the string

        for (let j = i + 1; j < productName.length; j++) {
            if (productName[j] > possibility[0].slice(-1)) {  // if the current character is greater
                possibility[0] += productName[j];
            } else {  // if the current character is smaller or equal
                possibility.push(j - 1);
                i = j;
                flag = false;
                break;
            }
        }

        // if the loop is broken due to the end of the string, add the last index of the string
        if (flag) {
            possibility.push(productName.length - 1);
            i = productName.length;
        }

        // if the code consists of 1 character only, the start and end will be the same
        if (possibility[0].length === 1) {
            possibility.push(possibility[1]);
            i = possibility[1] + 1;
        }

        if (results.length === 0) {  // no possibility pushed yet
            results.push(possibility);
        }
        else if (possibility[0].length > results[0][0].length) {  // bigger length found, discard previous possibilities
            results = [possibility];
        } 
        else if (possibility[0].length === results[0][0].length) {  // same length found, add to the list
            results.push(possibility);
        }
    }

    // if there are multiple possibilities of the same length, concatenate them
    while (results.length > 1) {
        let first = results.shift();
        let second = results.shift();

        let combined = [first[0] + second[0], first[1], second[2]];

        results.unshift(combined);
    }

    const productCode = hashedValue + "-" + String(results[0][1]) + results[0][0] + String(results[0][2]);
    return productCode;
};


const createProduct = async (req, res) => {
    try{
        const { name, description, price, discount, image, status, category } = req.body;
        let productCode = generateProductCode(name);

        const category_item = await Category.findOne({name: category});
        if (!category_item) {
            return res.status(400).json({message: "Category not found"});
        }

        if (price < 0 || discount < 0 || discount > 100) {
            return res.status(400).json({message: "Invalid price or discount"});
        }

        const product = await Product.create({
            name,
            description,
            price,
            discount,
            image,
            status,
            productCode,
            category: category_item._id
        });

        if (!product) {
            return res.status(400).json({message: "Product not created"});
        }

        res.status(201).json({product});
    }
    catch(err){
        if (err.code === 11000) {
            return res.status(400).json({message: "Product already exists"});
        }
        else {
            return res.status(500).json({message: err.message});
        }
    }
};

// delete a product
const deleteProduct = async (req, res) => {
    try{
        const { name } = req.params;
        const product = await Product.findOneAndDelete({name});

        if (!product) {
            return res.status(400).json({message: "Product not found"});
        }

        res.status(200).json({message: "Product deleted"});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
};


// get all products
const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find({}).populate("category", "name");
        
        if (!products) {
            return res.status(400).json({message: "No products found"});
        }

        res.status(200).json({products});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
};


// update availability
const updateAvailability = async (req, res) => {
    try{
        const { name } = req.params;
        const product = await Product.findOne({name});

        if (!product) {
            return res.status(400).json({message: "Product not found"});
        }

        product.status = product.status === "In Stock" ? "Stock Out" : "In Stock";
        await product.save();

        res.status(200).json({product});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
};


// update description
const updateDescription = async (req, res) => {
    try{
        const { name } = req.params;
        const { description } = req.body;

        const product = await Product.findOne({name});

        if (!product) {
            return res.status(400).json({message: "Product not found"});
        }

        product.description = description;
        await product.save();

        res.status(200).json({product});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
};


// update discount
const updateDiscount = async (req, res) => {
    try{
        const { name, newDiscount } = req.params;

        const product = await Product.findOne({name});

        if (!product) {
            return res.status(400).json({message: "Product not found"});
        }

        if (newDiscount < 0 || newDiscount > 100) {
            return res.status(400).json({message: "Invalid discount"});
        }

        product.discount = newDiscount;
        await product.save();

        res.status(200).json({product});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
};


// filter by category

const calculateFinalPrice = (products) => {
    // calculate the final price after discount
    products.forEach(product => {
        // create a new key to store the final price
        product.finalPrice = product.price - (product.price * product.discount / 100);
        
        // rename the price key to originalPrice
        product.originalPrice = product.price;
        delete product.price;
    });

    return products;
};


const filterByCategory = async (req, res) => {
    try{
        const { categoryName } = req.params;

        const category = await Category.findOne({name: categoryName});
        if (!category) {
            return res.status(400).json({message: "Category not found"});
        }

        let products = await Product.find({category: category._id}).lean();  // convert to plain JS object to add new key

        if (!products) {
            return res.status(400).json({message: "No products found"});
        }

        products = calculateFinalPrice(products);  // add final price key

        res.status(200).json({products});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
};


// filter by name
const filterByName = async (req, res) => {
    try{
        const { name } = req.params;

        let products = await Product.find({name: {$regex: name, $options: "i"}}).lean();  // case-insensitive search

        if (!products) {
            return res.status(400).json({message: "No products found"});
        }

        products = calculateFinalPrice(products);  // add final price key

        res.status(200).json({products});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
};


module.exports = {
    createProduct,
    deleteProduct,
    getAllProducts,
    updateAvailability,
    updateDescription,
    updateDiscount,
    filterByCategory,
    filterByName
};