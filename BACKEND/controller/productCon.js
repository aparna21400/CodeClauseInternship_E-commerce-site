import productModel from "../models/product.js";
import { v2 as cloudinary } from "cloudinary"

// func to add product
const add = async (req, res) => {
    try {
        const { name, description, old_price, new_price, category, size } = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]


        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )
        let parsedSize = [];
        if (size) {
            try {
                parsedSize = JSON.parse(size.replace(/'/g, '"')); // replace single quotes with double quotes
            } catch (err) {
                console.error("Invalid size format, using empty array", size);
            }
        }
        const productData = {
            name,
            description,
            category,
            old_price: Number(old_price),
            new_price: Number(new_price),
            size: parsedSize,
            image: imageUrl
        }
        console.log(productData);

        const product = new productModel(productData)
        await product.save();

        res.json({ success: true, message: "Product have been saved!" })


        console.log(name, description, old_price, new_price, category, size)
        console.log(imageUrl);

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// func to list product
const list = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// func to remove product
const remove = async (req, res) => {
    try {
        const { id } = req.params;

        await productModel.findByIdAndDelete(id);

        res.json({ success: true, message: "Product removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// func to singleProductInfo product
const singleProductInfo = async (req, res) => {
    try {
    const { productId } = req.body
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export { list, add, remove, singleProductInfo }