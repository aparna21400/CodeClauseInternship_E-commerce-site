import React, { useContext } from "react";
import { ShopContext } from "../components/Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../components/Breadcrums/Breadcrum";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import Descriptionbox from "../components/Description/Descriptionbox";
import Relatedproduct from "../components/RelatedProduct/Releatedproduct";
const Product = () => {
    const { all_product } = useContext(ShopContext);
    const { productId } = useParams();
    const product = all_product.find((e) => e.id === Number(productId));

    return (
        <div>
            <Breadcrum product={product} />
            <ProductDisplay product={product} />
            <Descriptionbox />
            <Relatedproduct/>
        </div>
    )
}
export default Product;