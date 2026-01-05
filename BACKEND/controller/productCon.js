import productModel from "../models/product.js";
import mongoose from 'mongoose';
import { v2 as cloudinary } from "cloudinary"

// func to add product
const add = async (req, res, next) => {
    try {
        const { name, description, old_price, new_price, category, size } = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imageUrl = await Promise.all(images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            }))
        let parsedSize = [];
        if (size) {
            try {
                parsedSize = JSON.parse(size.replace(/'/g, '"')); // replace single quotes with double quotes
            } catch (err) {
                // ignore invalid size format
                parsedSize = [];
            }
        }
        const productData = { name, description, category: category.toLowerCase(), old_price: Number(old_price), new_price: Number(new_price), size: parsedSize, image: imageUrl }

        const product = new productModel(productData)
        await product.save();

        res.json({ success: true, message: "Product have been saved!" })

    } catch (error) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
}

// func to list product
const list = async (req, res, next) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products })
    } catch (error) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
}

// func to remove product
const remove = async (req, res, next) => {
    try {
        const { id } = req.body;

        await productModel.findByIdAndDelete(id);

        res.json({ success: true, message: "Product removed" });
    } catch (error) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
};

// func to singleProductInfo product
const singleProductInfo = async (req, res, next) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
};

/**
 * Get product by ID from URL params
 * GET /api/product/:productId
 */
const getProductById = async (req, res, next) => {
    try {
        const { productId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({ success: false, message: 'Invalid product id' });

        const product = await productModel.findById(productId);
        
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        
        res.json({ success: true, product });
    } catch (error) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
};

/**
 * Get products by category
 * GET /api/product/category/:category
 */
const getProductsByCategory = async (req, res, next) => {
    try {
        const { category } = req.params;
        const products = await productModel.find({ category: category.toLowerCase() });
        
        res.json({ success: true, products });
    } catch (error) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
};

export { list, add, remove, singleProductInfo, getProductById, getProductsByCategory }