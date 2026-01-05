import React, { useContext } from "react";
import { ShopContext } from "../components/Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../components/Breadcrums/Breadcrum";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import Descriptionbox from "../components/Description/Descriptionbox";
import Relatedproduct from "../components/RelatedProduct/Releatedproduct";

const Product = () => {
    const { all_product, loading } = useContext(ShopContext);
    const { productId } = useParams();
    
    const product = all_product.find((e) => 
        e.id === Number(productId) || e._id === productId
    );

    if (loading) {
        return (
            <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <h2>Loading product...</h2>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <h2>Product not found!</h2>
                <p>The product you're looking for doesn't exist.</p>
            </div>
        );
    }

    return (
        <div>
            <Breadcrum product={product} />
            <ProductDisplay product={product} />
            <Descriptionbox />
            <Relatedproduct />
        </div>
    )
}

export default Product;