import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: Array, required: true },
    old_price: { type: Number, required: true },
    new_price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    size: { type: Array, required: true },
}, { timestamps: true });

const productModel = mongoose.models.product || mongoose.model('Product', productSchema);

export default productModel;