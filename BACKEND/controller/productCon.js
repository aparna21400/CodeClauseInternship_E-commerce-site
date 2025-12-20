import productModel from "../models/product.js";

// func to add product
const add = async (req, res) => {
    try {
        const { name, description, old_price, new_price, category, size } = req.body;
    } catch (error) {

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