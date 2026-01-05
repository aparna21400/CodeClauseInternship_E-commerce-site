import React from "react";
import './Breadcrum.css'
import arrow_icon from '../assests/breadcrum_arrow.png'

const Breadcrum = (props) => {
    const { product } = props;
    
    // ✅ Safety check - if product is undefined
    if (!product) {
        return (
            <div className="breadcrum container">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="breadcrum container">
            HOME <img src={arrow_icon} alt="" /> 
            SHOP <img src={arrow_icon} alt="" />
            {product.category} <img src={arrow_icon} alt="" />
            {product.name}
        </div>
    )
}

export default Breadcrum;