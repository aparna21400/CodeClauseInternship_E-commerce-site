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

        const productData = {
            name,
            description,
            category,
            old_price: Number(old_price),
            new_price: Number(new_price),
            size: JSON.parse(size)
        }

        console.log(name, description, old_price, new_price, category, size)
        console.log(imageUrl);

        res.json({})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// func to list product
const list = async (req, res) => {

}

// func to remove product
const remove = async (req, res) => {

}

// func to singleProductInfo product
const singleProductInfo = async (req, res) => {

}

export { list, add, remove, singleProductInfo }