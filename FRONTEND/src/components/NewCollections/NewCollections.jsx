import React, { useContext } from "react";
import './NewCollections.css';
import { ShopContext } from "../Context/ShopContext";
import Item from '../Item/Item';

const NewCollections = () => {
    const { products, loading } = useContext(ShopContext);
    
    // ✅ Get latest 8 products
    const newCollections = products.slice(-8).reverse();

    if (loading) {
        return (
            <div className="new-collections container">
                <h1>NEW COLLECTIONS</h1>
                <hr />
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="new-collections container">
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {newCollections.map((item, i) => (
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
    )
}

export default NewCollections;