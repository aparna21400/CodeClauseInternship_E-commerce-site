import React from "react";
import './Item.css';
import { Link } from "react-router-dom";

const Item = (props) => {
  // ✅ Use _id from backend, fallback to id
  const productId = props._id || props.id;
  
  return (
    <div className="item">
      <Link 
        to={`/product/${productId}`} 
        onClick={() => window.scrollTo(0, 0)} 
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {/* ✅ Handle array or string for image */}
        <img 
          src={Array.isArray(props.image) ? props.image[0] : props.image} 
          alt={props.name} 
        />
        <p>{props.name}</p>
        <div className="item-prices">
          <div className="item-price-new">
            ${props.new_price}
          </div>
          <div className="item-price-old">
            ${props.old_price}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Item;