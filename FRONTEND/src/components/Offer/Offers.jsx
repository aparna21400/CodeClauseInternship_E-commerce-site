import React from "react";
import './offers.css';
import exclusive_image from '../assests/kid-photo.png';

const Offers = () => {
    return (
        <div className="offers container">
            <div className="offers-left">
                <h1 className="responsive-heading">Exclusive</h1>
                <h1 className="responsive-heading">Offers For You</h1>
                <p className="responsive-text">ONLY ON BEST SELLERS PRODUCTS</p>
                <button>Check Now</button>
            </div>
            <div className="offers-right">
                <img className="responsive-img" src={exclusive_image} alt="exclusive offer" />
            </div>
        </div>
    );
};

export default Offers;
