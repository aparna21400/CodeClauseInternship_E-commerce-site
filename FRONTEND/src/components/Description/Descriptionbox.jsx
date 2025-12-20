import React from "react";
import './description.css'

const Description = () => {
    return (
        <div className="descrip container">
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews(122)</div>
            </div>
            <div className="descriptionbox-description">
                <p>An e-commerce website is an online platform that enables businesses or individuals to sell products or services over the internet.
                    It allows users to browse a catalog of items, view detailed product information, select sizes or variants, add products to a shopping
                    cart, and proceed to checkout.
                    These websites are designed to offer a convenient and seamless shopping experience, often including features such as product
                    filtering, search functionality, user reviews, secure payment options, and order tracking.</p>

                <p>
                    E-commerce websites are widely used across industries such as fashion, electronics, groceries, books, and more,
                    transforming the way people shop by providing 24/7 access to products from the comfort of their home.
                </p>
            </div>
        </div>
    )
}
export default Description;