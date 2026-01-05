import React, { useContext } from "react";
import './Popular.css';
import { ShopContext } from "../Context/ShopContext";
import Item from '../Item/Item';

const Popular = () => {
    const { products, loading } = useContext(ShopContext);
    
    // ✅ Filter women products
    const womenProducts = products.filter(item => 
        item.category === "women" || item.category === "Women"
    ).slice(0, 4); // Show only 4 products

    if (loading) {
        return (
            <div className="popular">
                <h1>POPULAR IN WOMEN</h1>
                <hr />
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="popular">
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="popular-item">
                {womenProducts.map((item, i) => (
                    <Item 
                        key={i} 
                        id={item._id} 
                        _id={item._id}
                        name={item.name} 
                        image={item.image} 
                        new_price={item.new_price} 
                        old_price={item.old_price} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Popular;